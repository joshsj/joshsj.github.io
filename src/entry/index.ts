import {
  makeCategoriseFiles,
  makeExtractData,
  makeReadSource,
  makeTransformFiles,
  makeWriteBuild, ReadSourceState
} from "@application/steps/build";
import { pipeline } from "@lib/pipeline";
import { loadConfig, setDefaultConfig } from "@application/steps/config";
import { io } from "@infrastructure/io";
import { config } from "dotenv";
import { getTransformer } from "@application/transformation";
import { getCategory } from "@application/categorisation";
import { getExtractor } from "@application/extraction";
import { watch } from "chokidar";
import path from "path";


const main = async () => {
  const getConfig = pipeline()
    .add(setDefaultConfig)
    .add(loadConfig)
    .build();

  const { config } = await getConfig();

  const readSource = makeReadSource(io, config);
  const transformFiles = makeTransformFiles(getTransformer, config);
  const writeBuild = makeWriteBuild(io, config);
  const categoriseFiles = makeCategoriseFiles(getCategory, config);
  const extractData = makeExtractData(getExtractor, config);

  const build = pipeline<ReadSourceState>()
    .add(readSource)
    .add(categoriseFiles)
    .add(extractData)
    .add(transformFiles)
    .add(writeBuild)
    .build();

  await build({ sourcePaths: undefined });

  if (process.argv.at(2) !== "--watch") { return; }

  watch(config.sourceDir, { cwd: config.sourceDir })
    .on("change", (path) => build({ sourcePaths: [ path ] }))
};


main();
