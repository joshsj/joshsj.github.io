import { GetExtractor } from "@application/extraction/types";
import { Config, Something } from "@domain";
import { Step } from "@lib/pipeline";
import { CategoriseFilesResult } from "./categoriseFiles";

type ExtractDataResult = { config: Config; somethings: Something[] };

const makeExtractData =
  (getExtractor: GetExtractor): Step<CategoriseFilesResult, ExtractDataResult> =>
  async ({ config, files }) => {
    const somethings = files.map((f) => getExtractor(f.category)(f));

    return { config, somethings };
  };

export { ExtractDataResult, makeExtractData };
