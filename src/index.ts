import { getCategory } from "@application/categorisation";
import { getExtractors } from "@application/extraction/getExtractors";
import { getRenderContext as _getRenderContext } from "@application/rendering/getRenderContext";
import { getRenderers } from "@application/rendering/getRenderers";
import { ReadSourceState } from "@application/steps";
import {
  categoriseFiles,
  extractData,
  readSource,
  transformFiles,
  updateSiteContext,
  writeBuild,
} from "@application/steps/build";
import { setDefaultConfig } from "@application/steps/config";
import { SiteContext } from "@application/steps/context";
import { getBuilders } from "@application/transformation/getBuilders";
import { locators } from "@application/transformation/locators";
import { Config } from "@domain";
import { io } from "@infrastructure/io";
import { consoleLogger as logger } from "@infrastructure/logging";
import { loadArgv, loadEnv } from "@infrastructure/steps";
import { pipeline } from "@lib/pipeline";
import { watch } from "chokidar";
import { benchmarkSteps } from "./entry/benchmark";
import { watchIndicator } from "./entry/watchIndicator";

const buildGetConfig = () => {
  const log = logger("config");
  return pipeline().add(setDefaultConfig(log)).add(loadArgv).add(loadEnv(log)).build();
};

const buildGenerate = (config: Config) => {
  const { benchmarkStart, benchmarkEnd } = benchmarkSteps();

  const log = config.debug ? logger("build") : () => {};
  const siteContext: SiteContext = [];

  const getRenderContext = _getRenderContext(siteContext, locators);
  const renderers = getRenderers(getRenderContext, config);
  const extractors = getExtractors(renderers);
  const builders = getBuilders(renderers);

  const buildPipeline = pipeline<ReadSourceState>()
    .add(benchmarkStart)
    .add(readSource(io, log, config))
    .add(categoriseFiles(getCategory, log, config))
    .add(extractData(extractors, log))
    .add(updateSiteContext(siteContext, io, log))
    .add(transformFiles(siteContext, locators, builders, log))
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
