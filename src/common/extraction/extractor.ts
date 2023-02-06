import { Renderers } from "@common/rendering";
import { FeatureName } from "@entities";
import { File } from "@entities/io";
import { makeAssetExtractor } from "@features/asset/assetExtractor";
import { makeCollectionExtractor } from "@features/collection/collectonExtractor";
import { makePageExtractor } from "@features/page/pageExtractor";
import { makePostExtractor } from "@features/post/postExtractor";
import { frontmatterExtractor } from "./frontmatterExtractor";

type Extracted<T extends {}> = { content: string; data: T };

type Extractor<T extends {} = any> = (file: File) => Promise<Extracted<T>>;

// TODO add typing to data object
type Extractors = { [K in FeatureName]: Extractor };

type DefaultExtractors<T extends {} = any> = {
  frontmatter: Extractor<T>;
  none: Extractor;
};

const makeDefaultExtractors = (): DefaultExtractors => ({
  frontmatter: frontmatterExtractor,
  none: async ({ content }) => ({ content, data: {} }),
});

const makeExtractors = (defaults: DefaultExtractors, renderers: Renderers): Extractors => ({
  asset: makeAssetExtractor(defaults),
  collection: makeCollectionExtractor(renderers),
  page: makePageExtractor(defaults),
  post: makePostExtractor(defaults),
});

export { Extracted, Extractor, Extractors, DefaultExtractors, makeDefaultExtractors, makeExtractors };
