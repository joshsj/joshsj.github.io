import { DefaultExtractors, Extractor } from "@common/extraction";

const makeAssetExtractor = ({ none }: DefaultExtractors): Extractor => none;

export { makeAssetExtractor };
