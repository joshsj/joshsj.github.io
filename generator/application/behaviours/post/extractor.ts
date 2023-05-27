import { IExtractor } from "@application/behaviours/types";
import { Post, PostData } from "@models";
import { File } from "@models/io";
import { IdentifiedFor } from "@models/steps";
import matter from "gray-matter";

const TocLinePattern = /(  |\t)h(?<n>\d) (?<text>.+)/g;
type TocLine = { level: number; text: string };

class PostExtractor implements IExtractor<"post"> {
  readonly for = "post";

  async extract({ file }: IdentifiedFor<"post">): Promise<Post> {
    const extracted = matter(file.content, { excerpt: false });
    const data = extracted.data as PostData;

    // First folder in directory tree
    data.collection = file.dir.segments.length === 3 ? file.dir.segments[1] : undefined;

    // Clean updated date
    if (data.created.getTime() === data.updated?.getTime()) {
      data.updated = undefined;
    }

    data.toc = PostExtractor.generateToc(file);
    file = file.with({ content: extracted.content });

    return { name: "post", file, ...data };
  }

  // Assumes heading levels are well-formed
  private static generateToc({ content }: File): string {
    const matches = [...content.matchAll(TocLinePattern)];
    const lines: TocLine[] = matches.map(({ groups }) => ({
      level: parseInt(groups!.n),
      text: groups!.text,
    }));

    if (!lines.length) {
      return "";
    }

    let toc = "";
    let curr = 0;

    for (const { level, text } of lines) {
      if (level > curr) {
        toc += "<ul>";
      } else if (level < curr) {
        toc += "</ul>";
      }

      toc += `<li>${text}</li>`;
      curr = level;
    }

    while (curr >= lines[0].level) {
      toc += "</ul>";
      --curr;
    }

    return toc;
  }
}

export { PostExtractor };
