import { makeAssetExtractor } from "@application/features/asset";
import { makeCollectionExtractor } from "@application/features/collection";
import { makePageExtractor } from "@application/features/page";
import { makePostExtractor } from "@application/features/post";
import { DefaultExtractors, Extractors, Renderers } from "@application/types/services";
import { frontmatterExtractor } from "@application/services";

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

export { makeDefaultExtractors, makeExtractors }