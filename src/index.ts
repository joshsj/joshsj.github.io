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

const main = async () => {
  const getConfig = pipeline()
    .add(setDefaultConfig(logger("config")))
    .add(loadEnv(logger("config")))
    .build();

  const { config } = await getConfig();

  const log = logger("build");

  const build = pipeline<ReadSourceState>()
    .add(readSource(io, log, config))
    .add(categoriseFiles(getCategory, log, config))
    .add(extractData(getExtractor))
    .add(transformFiles(getTransformer, log, config))
    .add(writeBuild(io, log, config))
    .build();

  await build({ sourcePaths: undefined });

  if (process.argv.at(2) !== "--watch") {
    return;
  }

  watch("**/*", { cwd: config.sourceDir, ignoreInitial: true })
    .on("add", (path) => build({ sourcePaths: [path] }))
    .on("change", (path) => build({ sourcePaths: [path] }));
};

main();
