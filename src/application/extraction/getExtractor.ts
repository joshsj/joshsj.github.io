import { SomethingCategory } from "@domain";
import { Extractor, GetExtractor } from "./types";
import { postExtractor as post } from "./postExtractor";

type Extractors = { [K in SomethingCategory]: Extractor<K> };

const extractors: Extractors = {
  asset: (file) => ({ category: "asset", file }),
  page: (file) => ({ category: "page", file }),
  post,
};

const getExtractor: GetExtractor = (category) => extractors[category];

export { getExtractor };
