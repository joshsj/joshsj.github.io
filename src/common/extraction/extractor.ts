import { Renderers } from "@common/rendering";
import { FeatureName } from "@entities";
import { File } from "@entities/io";
import { makeAssetExtractor } from "@features/asset/assetExtractor";
import { makeCollectionExtractor } from "@features/collection/collectonExtractor";
import { makePageExtractor } from "@features/page/pageExtractor";
import { frontmatterExtractor } from "./frontmatterExtractor";

type Extracted = { content: string; data: any };

type Extractor = (file: File) => Promise<Extracted>;

type Extractors = { [K in FeatureName]: Extractor };

type DefaultExtractors = {
  frontmatter: Extractor;
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
  post: makePageExtractor(defaults),
});

export { Extracted, Extractor, Extractors, DefaultExtractors, makeDefaultExtractors, makeExtractors };
