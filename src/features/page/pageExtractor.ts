import { DefaultExtractors, Extractor } from "@common/extraction/extractor";

const makePageExtractor = ({ frontmatter }: DefaultExtractors): Extractor => frontmatter;

export { makePageExtractor };
