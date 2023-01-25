import { pipeline } from "@lib/pipeline";
import { io } from "@infrastructure/io";
import { getCategory } from "@application/categorisation";
import { consoleLogger as logger } from "@infrastructure/logging";
import {
  categoriseFiles,
  extractData,
  readSource, ReadSourceState,
  setDefaultConfig,
  transformFiles,
  writeBuild,
} from "@application/steps";
import { watch } from "chokidar";
import { loadEnv } from "@infrastructure/steps";
import { BenchmarkContext, benchmarkEnd, benchmarkStart } from "./entry/benchmark";
import { watchIndicator } from "./entry/watchIndicator";
import { extractors } from "@application/extraction";
import { transformers } from "@application/transformation";
import { getHelpers } from "@application/context/getHelpers";
import { Config } from "@domain";
import { Context } from "@application/steps/context";
import { updateContext } from "@application/steps/updateContext";

type Flags = {
  watch: boolean;
  debug: boolean;
}

const getFlags = (): Flags => {
  const isSet = (arg: string) => process.argv.includes(`--${arg}`);

  return { watch: isSet("watch"), debug: isSet("debug") }
}

const getConfig = pipeline()
  .add(setDefaultConfig(logger("config")))
  .add(loadEnv(logger("config")))
  .build();

const getBuild = (config: Config, flags: Flags) => {
  const log = flags.debug ? logger("build") : () => {};

  const benchmarkContext: BenchmarkContext = {};

  const buildPipeline = pipeline<ReadSourceState>()
    .add(benchmarkStart(benchmarkContext))
    .add(readSource(io, log, config))
    .add(categoriseFiles(getCategory, log, config))
    .add(extractData(extractors, log))
    .add(updateContext)
    .add(transformFiles(transformers(config), getHelpers(transformers(config)), log))
    .add(writeBuild(io, log, config))
    .add(benchmarkEnd(benchmarkContext));

  if (flags.watch) {
    buildPipeline.add(watchIndicator);
  }

  return buildPipeline.build();
}


const main = async () => {
  const flags = getFlags();
  const { config } = await getConfig();

  const build = getBuild(config, flags);

  let context: Context = [];

  await build({ context });

  if (flags.watch) {
    const onChange = (p: string) => build({ context, sourcePaths: [p] }).then(result => {
      context = result.context;
    });

    watch("**/*", { cwd: config.sourceDir, ignoreInitial: true })
      .on("add", onChange)
      .on("change", onChange);
  }
};

main();
