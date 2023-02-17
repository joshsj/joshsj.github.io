import { assetBuilder } from "@application/behaviours/asset";
import { makePageBuilder } from "@application/behaviours/page";
import { makePostBuilder } from "@application/behaviours/post";
import { Renderers } from "@application/renderers/types";
import { Builders } from "./types";

const makeBuilders = (renderers: Renderers): Builders => ({
  asset: assetBuilder,
  collection: undefined,
  page: makePageBuilder(renderers),
  post: makePostBuilder(renderers),
});

export { makeBuilders };
