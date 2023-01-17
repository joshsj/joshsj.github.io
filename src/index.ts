import { getCategory } from "@application/categorisation/getCategory";
import {
  makeTransformFiles,
  makeWriteBuild,
  setDefaultConfig,
  loadConfig,
  makeCategoriseFiles,
} from "@application/steps";
import { makeReadSource } from "@application/steps/readSource";
import { getTransformer } from "@application/transformation/getTransformer";
import { io } from "@infrastructure/io";
import { pipeline } from "@lib/pipeline";

const main = async () => {
  const readSource = makeReadSource(io);
  const transformFiles = makeTransformFiles(getTransformer);
  const writeBuild = makeWriteBuild(io);
  const categoriseFiles = makeCategoriseFiles(getCategory);

  const run = pipeline()
    .add(setDefaultConfig)
    .add(loadConfig)
    .add(readSource)
    .add(categoriseFiles)
    .add(transformFiles)
    .add(writeBuild)
    .build();

  await run();
};

main();
