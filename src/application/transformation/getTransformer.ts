import { FileCategory } from "@domain";
import { assetTransformer as asset } from "./assetTransformer";
import { pageTransformer as page } from "./pageTransformer";
import { postTransformer as post } from "./postTransformer";
import { Transformer, GetTransformer } from "./types";

const transformers: { [K in FileCategory]: Transformer } = {
  asset,
  page,
  post,
};

const getTransformer: GetTransformer = (category) => transformers[category];

export { getTransformer };
