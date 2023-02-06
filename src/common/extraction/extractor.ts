import { FeatureName } from "@entities";
import { File } from "@entities/io";

type Extracted<T extends {}> = { content: string; data: T };

type Extractor<T extends {} = any> = (file: File) => Promise<Extracted<T>>;

// TODO add typing to data object
type Extractors = { [K in FeatureName]: Extractor };

type DefaultExtractors<T extends {} = any> = {
  frontmatter: Extractor<T>;
  none: Extractor;
};

export { Extracted, Extractor, Extractors, DefaultExtractors };
