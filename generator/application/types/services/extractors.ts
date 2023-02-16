import { FeatureName } from "@models";
import { Extractor } from "@application/types/behaviours";

// TODO add typing to data object
type Extractors = { [K in FeatureName]: Extractor };

type DefaultExtractors<T extends {} = any> = {
  frontmatter: Extractor<T>;
  none: Extractor;
};

export { Extractors, DefaultExtractors };
