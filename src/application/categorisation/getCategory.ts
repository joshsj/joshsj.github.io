import { SomethingCategory } from "@domain";
import { Categorisers, GetCategory } from ".";

// Order is important
const categorisers: Categorisers = {
  asset: ({ segments }, { assetDir }) => segments.at(0) === assetDir,
  collection: ({ segments, name, extension }, { postDir }) =>
    segments.at(0) === postDir && segments.length === 2 && !name && extension === ".yml",
  page: ({ segments, extension }, { pageDir }) => segments.at(0) === pageDir && extension === ".pug",
  post: ({ segments, extension }, { postDir }) => segments.at(0) === postDir && extension === ".pug",
  postAsset: ({ segments, extension }, { postDir }) => segments.at(0) === postDir && extension !== ".pug",
};

const getCategory: GetCategory = (file, config) =>
  Object.entries(categorisers)
    .find(([_, f]) => f(file, config))
    ?.at(0) as SomethingCategory;

export { getCategory };
