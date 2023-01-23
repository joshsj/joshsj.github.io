import matter from "gray-matter";
import { SomethingCategory } from "@domain";
import { Extractor } from "./types";

const makeExtractor =
  <T extends SomethingCategory>(): Extractor<T> =>
  (file) =>
    matter(file.content, { excerpt: false });

export { makeExtractor };
