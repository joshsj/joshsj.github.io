import { SomethingCategory } from "@domain";
import { Categorisers, GetCategory } from ".";

const categorisers: Categorisers = {
  asset: ({ segments }, { assetDir }) => segments.at(0) === assetDir,
  page: ({ segments, extension }, { pageDir }) => segments.at(0) === pageDir && extension === ".pug",
  post: ({ segments, extension }, { postDir }) => segments.at(0) === postDir && extension === ".pug",
  postAsset: ({ segments, extension }, { postDir }) => segments.at(0) === postDir && extension !== ".pug",
};

const getCategory: GetCategory = (file, config) =>
  Object.entries(categorisers)
    .find(([_, f]) => f(file, config))
    ?.at(0) as SomethingCategory;

export { getCategory };
