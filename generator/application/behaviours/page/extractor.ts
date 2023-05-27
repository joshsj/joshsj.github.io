import { IExtractor } from "@application/behaviours/types";
import { Page, PageData } from "@models";
import { IdentifiedFor } from "@models/steps";
import matter from "gray-matter";

class PageExtractor implements IExtractor<"page"> {
  readonly for = "page";

  async extract({ file }: IdentifiedFor<"page">): Promise<Page> {
    const { content, data } = matter(file.content, { excerpt: false });

    return { name: "page", file: file.with({ content }), ...(data as PageData) };
  }
}

export { PageExtractor };
