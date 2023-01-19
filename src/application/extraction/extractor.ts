import matter from "gray-matter";
import { SomethingCategory } from "@domain";
import { Extractor } from "./types";

type ToExtractor = <T extends SomethingCategory>(category: T) => Extractor<T>;

const extractor =
  <T extends SomethingCategory>(): Extractor<T> =>
  (file) =>
    matter(file.content, { excerpt: false });

export { ToExtractor, extractor };
