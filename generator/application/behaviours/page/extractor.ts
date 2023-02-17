import { DefaultExtractors, Extractor } from "@application/behaviours/types";

const makePageExtractor = ({ frontmatter }: DefaultExtractors): Extractor => frontmatter;

export { makePageExtractor };
