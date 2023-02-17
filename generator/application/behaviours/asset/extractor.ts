import { DefaultExtractors, Extractor } from "@application/behaviours/types";

const makeAssetExtractor = ({ none }: DefaultExtractors): Extractor => none;

export { makeAssetExtractor };
