import { makeTransformFiles, makeWriteBuild, setDefaultConfig, loadConfig, categoriseFiles } from "@application/steps";
import { makeReadSource } from "@application/steps/readSource";
import { assetTransformer, pageTransformer } from "@application/transformation";
import { io } from "@infrastructure/io";

const main = async () => {
  const transformers = [assetTransformer, pageTransformer];

  const readSource = makeReadSource(io);
  const transformFiles = makeTransformFiles(transformers);
  const writeBuild = makeWriteBuild(io);

  // TODO have a guess
  const build = setDefaultConfig(loadConfig(readSource(categoriseFiles(transformFiles(writeBuild())))));

  await build();
};

main();
