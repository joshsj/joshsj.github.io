import { Extractor } from "@application/behaviours/types";
import { DefaultExtractors } from "@application/services/types";

const makeAssetExtractor = ({ none }: DefaultExtractors): Extractor => none;

export { makeAssetExtractor };
