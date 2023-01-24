import { Extractors } from "./types";
import { makeExtractor } from "./makeExtractor";

const extractors: Extractors = {
  asset: ({ content }) => ({ content, data: {} }),
  page: makeExtractor(),
  post: makeExtractor(),
};

export { extractors };
