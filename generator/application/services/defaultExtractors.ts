import matter from "gray-matter";
import { DefaultExtractors } from "./types/defaultExtractors";

const defaultExtractors: DefaultExtractors = {
  frontmatter: async ({ content }) => matter(content, { excerpt: false }),
  none: async ({ content }) => ({ content, data: {} }),
};

export { defaultExtractors };
