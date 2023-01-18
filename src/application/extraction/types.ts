import { CategorisedFile } from "@application/steps";
import {Something, SomethingCategory, SomethingFor} from "@domain";

type Extractor<T extends SomethingCategory> = (file: CategorisedFile & { category: T }) => SomethingFor<T>

type GetExtractor = <T extends SomethingCategory>(category: T) => Extractor<T>;

export { Extractor, GetExtractor };
