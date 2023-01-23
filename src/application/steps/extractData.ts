import { GetExtractor } from "@application/extraction/types";
import { Something } from "@domain";
import { Step } from "@lib/pipeline";
import { CategoriseFilesResult } from "./categoriseFiles";
import { ExtractDataResult } from "./types";

const extractData =
  (getExtractor: GetExtractor): Step<CategoriseFilesResult, ExtractDataResult> =>
    async ({ files }) => ({
      somethings: files.map(file => {
        const { content, data } = getExtractor(file.category)(file);

        return { category: file.category, file: file.with({ content }), data };
      })
    });

export { ExtractDataResult, extractData };
