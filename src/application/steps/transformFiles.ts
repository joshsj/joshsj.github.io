import { File } from "@domain/io";
import { isFulfilled } from "@domain/utils";
import { Step } from "@lib/pipeline";
import { Config } from "@domain";
import { GetTransformer } from "@application/transformation";
import { ExtractDataResult } from "./extractData";

type TransformFilesResult = { buildFiles: File[]; config: Config };

const makeTransformFiles =
  (getTransformer: GetTransformer): Step<ExtractDataResult, TransformFilesResult> =>
  async ({ somethings, config }) => {
    const results = await Promise.allSettled(somethings.map((s) => getTransformer(s.category)(s)));

    const buildFiles = results.filter(isFulfilled).map((r) => r.value);

    return { buildFiles, config };
  };

export { TransformFilesResult, makeTransformFiles };
