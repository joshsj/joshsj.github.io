import { getCategory } from "@application/categorisation";
import { getExtractor } from "@application/extraction";
import {
  loadConfig,
  makeCategoriseFiles,
  makeExtractData,
  makeReadSource,
  makeTransformFiles,
  makeWriteBuild,
  setDefaultConfig,
} from "@application/steps";
import { getTransformer } from "@application/transformation";
import { io } from "@infrastructure/io";
import { pipeline } from "@lib/pipeline";

const main = async () => {
  const readSource = makeReadSource(io);
  const transformFiles = makeTransformFiles(getTransformer);
  const writeBuild = makeWriteBuild(io);
  const categoriseFiles = makeCategoriseFiles(getCategory);
  const extractData = makeExtractData(getExtractor);

  const run = pipeline()
    .add(setDefaultConfig)
    .add(loadConfig)
    .add(readSource)
    .add(categoriseFiles)
    .add(extractData)
    .add(transformFiles)
    .add(writeBuild)
    .build();

  await run();
};

main();
