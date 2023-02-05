import matter from "gray-matter";
import { Extractor } from "./types";

const frontmatter: Extractor = async ({ content }) => matter(content, { excerpt: false });

export { frontmatter };
