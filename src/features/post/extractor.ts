import { DefaultExtractors, Extractor } from "@common/extraction/extractor";
import { PostData } from "@entities";

const makePostExtractor =
  ({ frontmatter }: DefaultExtractors<PostData>): Extractor<PostData> =>
  async (file) => {
    const extracted = await frontmatter(file);

    extracted.data.collection = file.segments.length === 3 ? file.segments[1] : undefined;

    return extracted;
  };

export { makePostExtractor };
