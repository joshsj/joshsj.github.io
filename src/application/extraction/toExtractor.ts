import matter from "gray-matter";
import {SomethingCategory, SomethingFor} from "@domain";
import {Extractor} from "./types";

type ToExtractor = <T extends SomethingCategory>(category: T) => Extractor<T>;

const toExtractor = <T extends SomethingCategory>(category: T): Extractor<T> =>
  (file) => {
    const {data, content} = matter(file.contents, {excerpt: false});

    console.log({data, content});

    return {
      category,
      file: file.with({contents: content}),
      data: data ?? undefined
    } as SomethingFor<T>;
  }

export {ToExtractor, toExtractor}