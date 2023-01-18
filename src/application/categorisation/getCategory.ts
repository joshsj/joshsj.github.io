import { SomethingCategory } from "@domain";
import { Categorisers, GetCategory } from ".";

const identifiers: Categorisers = {
  asset: ({ segments }, { assetDir }) => segments.at(0) === assetDir,
  page: ({ segments, extension }, { pageDir }) => extension === ".pug" && segments.at(0) === pageDir,
  post: ({ segments, extension }, { postDir }) => extension === ".pug" && segments.at(0) === postDir,
};

const getCategory: GetCategory = (file, config) =>
  Object.entries(identifiers)
    .find(([_, f]) => f(file, config))!
    .at(0) as SomethingCategory;

export { getCategory };
