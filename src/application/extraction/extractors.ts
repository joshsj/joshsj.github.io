import { Extractor, Extractors } from "./types";
import { makeExtractor } from "./makeExtractor";

const none: Extractor = ({ content }) => ({ content, data: {} });

const extractors: Extractors = {
  asset: none,
  page: makeExtractor(),
  post: makeExtractor(),
  postAsset: none,
};

export { extractors };
