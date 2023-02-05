import { pipeline } from "@lib/pipeline";
import { io } from "@infrastructure/io";
import { getCategory } from "@application/categorisation";
import { consoleLogger as logger } from "@infrastructure/logging";
import {
  categoriseFiles,
  extractData,
  readSource,
  transformFiles,
  updateContext,
  writeBuild,
} from "@application/steps/build";
import { watch } from "chokidar";
import { loadArgv, loadEnv } from "@infrastructure/steps";
import { benchmarkSteps } from "./entry/benchmark";
import { watchIndicator } from "./entry/watchIndicator";
import { extractors } from "@application/extraction";
import { transformers } from "@application/transformation";
import { getHelpers } from "@application/context/getHelpers";
import { Config } from "@domain";
import { SiteContext } from "@application/steps/context";
import { setDefaultConfig } from "@application/steps/config";
import { ReadSourceState } from "@application/steps";

const buildGetConfig = () => {
  const log = logger("config");
  return pipeline().add(setDefaultConfig(log)).add(loadArgv).add(loadEnv(log)).build();
};

const buildGenerate = (config: Config) => {
  const { benchmarkStart, benchmarkEnd } = benchmarkSteps();

  const log = config.debug ? logger("build") : () => {};
  const siteContext: SiteContext = [];

  const buildPipeline = pipeline<ReadSourceState>()
    .add(benchmarkStart)
    .add(readSource(io, log, config))
    .add(categoriseFiles(getCategory, log, config))
    .add(extractData(extractors, log))
    .add(updateContext(siteContext))
    .add(transformFiles(siteContext, transformers(config), getHelpers(transformers(config)), log))
    .add(writeBuild(io, log, config))
    .add(benchmarkEnd);

  if (config.watch) {
    buildPipeline.add(watchIndicator);
  }

  return buildPipeline.build();
};

const main = async () => {
  const getConfig = buildGetConfig();
  const { config } = await getConfig();

  const build = buildGenerate(config);

  await build({ sourcePaths: [] });

  if (config.watch) {
    const onChange = (p: string) => build({ sourcePaths: [p] });

    watch("**/*", { cwd: config.sourceDir, ignoreInitial: true }).on("add", onChange).on("change", onChange);
  }
};

main();
