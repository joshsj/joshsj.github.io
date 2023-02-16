import { Extractor } from "@common/extraction/extractor";
import matter from "gray-matter";

const frontmatterExtractor: Extractor = async ({ content }) => matter(content, { excerpt: false });

export { frontmatterExtractor };
