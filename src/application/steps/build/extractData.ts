import { GetExtractor } from "@application/extraction/types";
import { Config, Something } from "@domain";
import { Step } from "@lib/pipeline";
import { CategoriseFilesResult } from "./categoriseFiles";

type ExtractDataResult = { somethings: Something[] };

const makeExtractData =
  (getExtractor: GetExtractor, config: Config): Step<CategoriseFilesResult, ExtractDataResult> =>
    async ({ files }) => {
      const somethings = files.map((f) => getExtractor(f.category)(f));

      return { somethings };
    };

export { ExtractDataResult, makeExtractData };
