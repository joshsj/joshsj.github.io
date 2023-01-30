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
import { loadEnv } from "@infrastructure/steps";
import { BenchmarkContext, benchmarkEnd, benchmarkStart } from "./entry/benchmark";
import { watchIndicator } from "./entry/watchIndicator";
import { extractors } from "@application/extraction";
import { transformers } from "@application/transformation";
import { getHelpers } from "@application/context/getHelpers";
import { Config } from "@domain";
import { SiteContext } from "@application/steps/context";
import { setDefaultConfig } from "@application/steps/config";
import { ReadSourceState } from "@application/steps";

type Flags = {
  watch: boolean;
  debug: boolean;
};

const getFlags = (): Flags => {
  const isSet = (arg: string) => process.argv.includes(`--${arg}`);

  return { watch: isSet("watch"), debug: isSet("debug") };
};

const buildGetConfig = (flags: Flags) => {
  const log = flags.debug ? logger("config") : () => {};

  return pipeline().add(setDefaultConfig(log)).add(loadEnv(log)).build();
};

const buildGenerate = (config: Config, flags: Flags) => {
  const log = flags.debug ? logger("build") : () => {};

  const benchmarkContext: BenchmarkContext = {};
  let siteContext: SiteContext = [];

  const buildPipeline = pipeline<ReadSourceState>()
    .add(benchmarkStart(benchmarkContext))
    .add(readSource(io, log, config))
    .add(categoriseFiles(getCategory, log, config))
    .add(extractData(extractors, log))
    .add(updateContext(siteContext))
    .add(transformFiles(siteContext, transformers(config), getHelpers(transformers(config)), log))
    .add(writeBuild(io, log, config))
    .add(benchmarkEnd(benchmarkContext));

  if (flags.watch) {
    buildPipeline.add(watchIndicator);
  }

  return buildPipeline.build();
};

const main = async () => {
  const flags = getFlags();

  const getConfig = buildGetConfig(flags);

  const { config } = await getConfig();
  const build = buildGenerate(config, flags);

  await build({ sourcePaths: [] });

  if (flags.watch) {
    const onChange = (p: string) => build({ sourcePaths: [p] });

    watch("**/*", { cwd: config.sourceDir, ignoreInitial: true }).on("add", onChange).on("change", onChange);
  }
};

main();
