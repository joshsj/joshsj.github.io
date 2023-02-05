import { Feature, FeatureName } from "@entities";
import { assetBuilder } from "@features/asset/assetBuilder";
import { makePageBuilder } from "@features/page/pageBuilder";
import { makePostBuilder } from "@features/post/postBuilder";
import { Renderers } from "./rendering";

type Builder = (something: Feature) => Promise<string>;

type Builders = { [K in FeatureName]: Builder | undefined };

const makeBuilders = (renderers: Renderers): Builders => ({
  asset: assetBuilder,
  collection: undefined,
  page: makePageBuilder(renderers),
  post: makePostBuilder(renderers),
});

export { Builder, Builders, makeBuilders };
