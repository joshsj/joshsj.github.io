import { makePostBuilder } from "@features/post";
import { makePageBuilder } from "@features/page";
import { assetBuilder } from "@features/asset";
import { Renderers } from "@common/rendering";
import { Builders } from "./builder";

const makeBuilders = (renderers: Renderers): Builders => ({
  asset: assetBuilder,
  collection: undefined,
  page: makePageBuilder(renderers),
  post: makePostBuilder(renderers),
});

export { makeBuilders }