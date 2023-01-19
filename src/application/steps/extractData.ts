import { GetExtractor } from "@application/extraction/types";
import { Something } from "@domain";
import { Step } from "@lib/pipeline";
import { CategoriseFilesResult } from "./categoriseFiles";

type ExtractDataResult = { somethings: Something[] };

const extractData =
  (getExtractor: GetExtractor): Step<CategoriseFilesResult, ExtractDataResult> =>
  async ({ files }) => {
    const somethings: Something[] = [];

    for (const file of files) {
      const { content, data } = getExtractor(file.category)(file);

      somethings.push({ category: file.category, file: file.with({ content }), data });
    }

    return { somethings };
  };

export { ExtractDataResult, extractData };
