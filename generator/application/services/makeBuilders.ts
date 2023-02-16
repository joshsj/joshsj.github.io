import { assetBuilder } from "@application/features/asset";
import { makePageBuilder } from "@application/features/page";
import { makePostBuilder } from "@application/features/post";
import { Builders, Renderers } from "@application/types/services";

const makeBuilders = (renderers: Renderers): Builders => ({
  asset: assetBuilder,
  collection: undefined,
  page: makePageBuilder(renderers),
  post: makePostBuilder(renderers),
});

export { makeBuilders }