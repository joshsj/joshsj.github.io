import { Extractor } from "@application/behaviours/types";
import { DefaultExtractors } from "@application/services/types";

const makePageExtractor = ({ frontmatter }: DefaultExtractors): Extractor => frontmatter;

export { makePageExtractor };
