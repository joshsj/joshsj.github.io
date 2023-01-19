import { CategorisedFile } from "@application/steps";
import { SomethingCategory } from "@domain";

type Extracted = {
  content: string;
  // TODO consider something better than any
  data: any;
};

type Extractor<T extends SomethingCategory> = (file: CategorisedFile & { category: T }) => Extracted;

type GetExtractor = <T extends SomethingCategory>(category: T) => Extractor<T>;

export { Extractor, GetExtractor };
