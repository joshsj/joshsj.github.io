import { isFulfilled } from "@lib/utils";
import { Step } from "@lib/pipeline";
import { Config } from "@domain";
import { GetTransformer } from "@application/transformation";
import { ExtractDataResult } from "./extractData";
import { Logger } from "@application/logging";
import { TransformFilesResult } from "./types";

const transformFiles =
  (getTransformer: GetTransformer, log: Logger, config: Config): Step<ExtractDataResult, TransformFilesResult> =>
  async ({ somethings }) => {
    const results = await Promise.allSettled(somethings.map((s) => getTransformer(s.category)(s)));

    const buildFiles = results.filter(isFulfilled).map((r) => r.value);

    return { buildFiles, config };
  };

export { TransformFilesResult, transformFiles };
