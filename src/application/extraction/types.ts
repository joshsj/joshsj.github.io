import { CategorisedFile } from "@application/steps";
import { Something, SomethingCategory } from "@domain";

type Extractor<T extends SomethingCategory> = (file: CategorisedFile & { category: T }) => Something & { category: T };

type GetExtractor = <T extends SomethingCategory>(category: T) => Extractor<T>;

export { Extractor, GetExtractor };
