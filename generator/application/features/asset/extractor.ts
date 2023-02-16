import { Extractor } from "@application/types/behaviours";
import { DefaultExtractors } from "@application/types/services";

const makeAssetExtractor = ({ none }: DefaultExtractors): Extractor => none;

export { makeAssetExtractor };
