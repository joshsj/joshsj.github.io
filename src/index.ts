import { getCategory } from "@application/categorisation/getCategory";
import { getExtractor } from "@application/extraction/getExtractor";
import {
  makeTransformFiles,
  makeWriteBuild,
  setDefaultConfig,
  loadConfig,
  makeCategoriseFiles,
} from "@application/steps";
import { makeExtractData } from "@application/steps/extractData";
import { makeReadSource } from "@application/steps/readSource";
import { getTransformer } from "@application/transformation/getTransformer";
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
