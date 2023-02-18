import { Extractor } from "@application/behaviours/types";

type DefaultExtractors<T extends {} = any> = {
  frontmatter: Extractor<T>;
  none: Extractor;
};

export { DefaultExtractors };
