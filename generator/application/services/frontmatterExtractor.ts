import { Extractor } from "@application/behaviours/types";
import matter from "gray-matter";

const frontmatterExtractor: Extractor = async ({ content }) => matter(content, { excerpt: false });

export { frontmatterExtractor };
