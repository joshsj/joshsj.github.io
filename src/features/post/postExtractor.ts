import { DefaultExtractors, Extractor } from "@common/extraction/extractor";

const makePostExtractor = ({ frontmatter }: DefaultExtractors): Extractor => frontmatter;

export { makePostExtractor };
