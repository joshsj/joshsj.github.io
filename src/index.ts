import { pipeline } from "@lib/pipeline";
import { io } from "@infrastructure/io";
import { getCategory } from "@application/categorisation";
import { consoleLogger as logger } from "@infrastructure/logging";
import {
  categoriseFiles,
  extractData,
  readSource,
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

const configure = async (isWatch: boolean) => {
  const getConfig = pipeline()
    .add(setDefaultConfig(logger("config")))
    .add(loadEnv(logger("config")))
    .build();

  const { config } = await getConfig();

  const log = logger("build");

  const benchmarkContext: BenchmarkContext = {};

  const buildPipeline = pipeline()
    .add(benchmarkStart(benchmarkContext))
    .add(readSource(io, log, config))
    .add(categoriseFiles(getCategory, log, config))
    .add(extractData(extractors))
    .add(transformFiles(transformers, log, config))
    .add(writeBuild(io, log, config))
    .add(benchmarkEnd(benchmarkContext, logger("benchmark")));

  if (isWatch) {
    buildPipeline.add(watchIndicator(logger()));
  }

  return { config, getConfig, build: buildPipeline.build() };
};

const main = async () => {
  const isWatch = process.argv.at(2) === "--watch";

  const { config, build } = await configure(isWatch);

  await build();

  if (isWatch) {
    watch("**/*", { cwd: config.sourceDir, ignoreInitial: true }).on("add", build).on("change", build);
  }
};

main();
