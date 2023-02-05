import { SomethingCategory } from "@domain";
import { File } from "@domain/io";

type Extracted = {
  content: string;
  // TODO consider something better than any
  data: any;
};

type Extractor = (file: File) => Promise<Extracted>;

type Extractors = { [K in SomethingCategory]: Extractor };

export { Extracted, Extractor, Extractors };
