import { makeTransformFiles, makeWriteBuild, setDefaultConfig, loadConfig, categoriseFiles } from "@application/steps";
import { makeReadSource } from "@application/steps/readSource";
import { AssetTransformer, PageTransformer } from "@application/transformation";
import { IIO } from "@domain/io";
import { IO } from "@infrastructure/io";

const main = async () => {
  const io: IIO = new IO();
  const transformers = [new AssetTransformer(), new PageTransformer()];

  const readSource = makeReadSource(io);
  const transformFiles = makeTransformFiles(transformers);
  const writeBuild = makeWriteBuild(io);

  // TODO have a guess
  const build = setDefaultConfig(loadConfig(readSource(categoriseFiles(transformFiles(writeBuild)))));

  await build();
};

main();
