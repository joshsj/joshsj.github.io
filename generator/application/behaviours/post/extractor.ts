import { Extractor } from "@application/behaviours/types";
import { DefaultExtractors } from "@application/services/types";
import { PostData } from "@models";

const TocLinePattern = /(  |\t)h(?<n>\d) (?<text>.+)/g;
type TocLine = { level: number; text: string };

// Assumes heading levels are well-formed
const generateToc = (content: string): string => {
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
};

const makePostExtractor =
  ({ frontmatter }: DefaultExtractors<PostData>): Extractor<PostData> =>
  async (file) => {
    const extracted = await frontmatter(file);

    extracted.data.collection = file.segments.length === 3 ? file.segments[1] : undefined;

    // Clean updated date
    if (extracted.data.created.getTime() === extracted.data.updated?.getTime()) {
      extracted.data.updated = undefined;
    }

    extracted.data.toc = generateToc(extracted.content);

    return extracted;
  };

export { makePostExtractor };
