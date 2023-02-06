import { frontmatterExtractor } from "@common/extraction/frontmatterExtractor";
import { Renderers } from "@common/rendering";
import { makeAssetExtractor } from "@features/asset";
import { makeCollectionExtractor } from "@features/collection";
import { makePageExtractor } from "@features/page";
import { makePostExtractor } from "@features/post";
import { Extractor, Extractors } from "@common/extraction/extractor";

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

export {makeDefaultExtractors, makeExtractors}