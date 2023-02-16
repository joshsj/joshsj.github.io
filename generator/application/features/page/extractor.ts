import { DefaultExtractors } from "@application/types/services";
import { Extractor } from "@application/types/behaviours";

const makePageExtractor = ({ frontmatter }: DefaultExtractors): Extractor => frontmatter;

export { makePageExtractor };
