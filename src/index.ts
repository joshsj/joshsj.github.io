import { makeTransformFiles, makeWriteBuild, setDefaultConfig, loadConfig, categoriseFiles } from "@application/steps";
import { makeReadSource } from "@application/steps/readSource";
import { assetTransformer, pageTransformer, Transformers } from "@application/transformation";
import { io } from "@infrastructure/io";
import { pipeline } from "@lib/pipeline";

const main = async () => {
  const transformers: Transformers = { asset: assetTransformer, page: pageTransformer };

  const readSource = makeReadSource(io);
  const transformFiles = makeTransformFiles(transformers);
  const writeBuild = makeWriteBuild(io);

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
