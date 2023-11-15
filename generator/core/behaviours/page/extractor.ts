import { IExtractor } from "@core/behaviours/interfaces";
import { Page, PageData } from "@core/models";
import { Identified } from "@core/models/steps";
import matter from "gray-matter";

class PageExtractor implements IExtractor<Page> {
  readonly for = "page";

  async extract({ file }: Identified<Page>): Promise<Page> {
    const { content, data } = matter(file.content, { excerpt: false });

    return { name: "page", file: file.with({ content }), ...(data as PageData) };
  }
}

export { PageExtractor };
