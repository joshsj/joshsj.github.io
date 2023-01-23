import { SomethingCategory } from "@domain";
import { Extractor, GetExtractor } from "./types";
import { makeExtractor } from "./makeExtractor"

type Extractors = { [K in SomethingCategory]: Extractor<K> };

const extractors: Extractors = {
  asset: ({ content }) => ({ content, data: {} }),
  page: makeExtractor(),
  post: makeExtractor(),
};

const getExtractor: GetExtractor = (category) => extractors[category];

export { getExtractor };
