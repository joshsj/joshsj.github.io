import { IExtractor } from "@application/behaviours/interfaces";
import { Page, PageData } from "@models";
import { Identified } from "@models/steps";
import matter from "gray-matter";

class PageExtractor implements IExtractor<Page> {
  readonly for = "page";

  async extract({ file }: Identified<Page>): Promise<Page> {
    const { content, data } = matter(file.content, { excerpt: false });

    return { name: "page", file: file.with({ content }), ...(data as PageData) };
  }
}

export { PageExtractor };
