import { pipeline } from "@lib/pipeline";
import { io } from "@infrastructure/io";
import { getTransformer } from "@application/transformation";
import { getCategory } from "@application/categorisation";
import { getExtractor } from "@application/extraction";
import { consoleLogger as logger } from "@infrastructure/logging";
import {
  categoriseFiles,
  extractData,
  readSource,
  ReadSourceState,
  setDefaultConfig,
  transformFiles,
  writeBuild,
} from "@application/steps";
import { watch } from "chokidar";
import { loadEnv } from "@infrastructure/steps";
import { BenchmarkContext, benchmarkEnd, benchmarkStart } from "./entry/benchmark";

const configure = async () => {
  const getConfig = pipeline()
    .add(setDefaultConfig(logger("config")))
    .add(loadEnv(logger("config")))
    .build();

  const { config } = await getConfig();

  const log = logger("build");

  const benchmarkContext: BenchmarkContext = {};

  const build = pipeline()
    .add(benchmarkStart(benchmarkContext))
    .add(readSource(io, log, config))
    .add(categoriseFiles(getCategory, log, config))
    .add(extractData(getExtractor))
    .add(transformFiles(getTransformer, log, config))
    .add(writeBuild(io, log, config))
    .add(benchmarkEnd(benchmarkContext, logger("benchmark")))
    .build();

  return { config, getConfig, build };
}

const main = async () => {
  const { config, build } = await configure();

  await build();

  if (process.argv.at(2) !== "--watch") { return; }

  watch("**/*", { cwd: config.sourceDir, ignoreInitial: true })
    .on("add", build)
    .on("change", build);
};

main();
