import { makeAssetExtractor } from "@application/behaviours/asset";
import { makeCollectionExtractor } from "@application/behaviours/collection";
import { makePageExtractor } from "@application/behaviours/page";
import { makePostExtractor } from "@application/behaviours/post";
import { Renderers } from "@application/renderers/types";
import { frontmatterExtractor } from "@application/services";
import { DefaultExtractors, Extractors } from "./types";

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

export { makeDefaultExtractors, makeExtractors };
