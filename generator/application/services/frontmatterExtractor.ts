import { Extractor } from "@application/types/behaviours";
import matter from "gray-matter";

const frontmatterExtractor: Extractor = async ({ content }) => matter(content, { excerpt: false });

export { frontmatterExtractor };
