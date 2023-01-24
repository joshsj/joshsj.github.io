import matter from "gray-matter";
import { Extractor } from "./types";

const makeExtractor = (): Extractor => (file) => matter(file.content, { excerpt: false });

export { makeExtractor };
