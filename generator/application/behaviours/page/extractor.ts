import { IExtractor } from "@application/behaviours/types";
import { Page, PageData } from "@models";
import { File } from "@models/io";
import matter from "gray-matter";

class PageExtractor implements IExtractor<Page> {
  async extract(file: File): Promise<Page> {
    const { content, data } = matter(file.content, { excerpt: false });

    return { name: "page", file: file.with({ content }), data: data as PageData };
  }
}

export { PageExtractor };
