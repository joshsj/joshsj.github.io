import { PostData } from "@domain";
import matter from "gray-matter";
import { Extractor } from "./types";

const postExtractor: Extractor<"post"> = (file) => {
  if (!file.contents) {
    return { category: "post", file, data: { title: "", created: new Date(0) } };
  }

  // TODO validation
  const { data, content } = matter(file.contents, { excerpt: false });

  return {
    category: "post",
    file: file.with({ contents: content }),
    data: data as PostData,
  };
};

export { postExtractor };
