import { SomethingCategory } from "@domain";
import { Extractor, GetExtractor } from "./types";
import { extractor } from "@application/extraction/extractor";

type Extractors = { [K in SomethingCategory]: Extractor<K> };

const extractors: Extractors = {
  asset: ({ content }) => ({ content, data: {} }),
  page: extractor(),
  post: extractor(),
};

const getExtractor: GetExtractor = (category) => extractors[category];

export { getExtractor };
