import { DefaultExtractors, Extractor } from "@application/behaviours/types";
import { PostData } from "@models";

const makePostExtractor =
  ({ frontmatter }: DefaultExtractors<PostData>): Extractor<PostData> =>
  async (file) => {
    const extracted = await frontmatter(file);

    extracted.data.collection = file.segments.length === 3 ? file.segments[1] : undefined;

    // Clean updated date
    if (extracted.data.created.getTime() === extracted.data.updated?.getTime()) {
      extracted.data.updated = undefined;
    }

    return extracted;
  };

export { makePostExtractor };
