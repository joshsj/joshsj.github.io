import { SomethingCategory } from "@domain";
import { Extractor, GetExtractor } from "./types";
import { toExtractor } from "@application/extraction/toExtractor";

type Extractors = { [K in SomethingCategory]: Extractor<K> };

const extractors: Extractors = {
  asset: (file) => ({ category: "asset", file }),
  page: toExtractor("page"),
  post: toExtractor("post")
};

const getExtractor: GetExtractor = (category) => extractors[category];

export { getExtractor };
