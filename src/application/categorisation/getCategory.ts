import { Config, SomethingCategory } from "@domain";
import { File } from "@domain/io";

type GetCategory = (file: File, config: Config) => SomethingCategory;

type Categorisers = { [K in SomethingCategory]: (file: File, config: Config) => boolean };

const identifiers: Categorisers = {
  asset: ({ segments }, { assetDir }) => segments.at(0) === assetDir,
  page: ({ segments, extension }, { pageDir }) => extension === ".pug" && segments.at(0) === pageDir,
  post: ({ segments, extension }, { postDir }) => extension === ".pug" && segments.at(0) === postDir,
};

const getCategory: GetCategory = (file, config) =>
  Object.entries(identifiers)
    .find(([_, f]) => f(file, config))!
    .at(0) as SomethingCategory;

export { GetCategory, getCategory };
