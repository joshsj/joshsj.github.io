import { File } from "@domain/io";
import { isFulfilled } from "@domain/utils";
import { Step } from "@lib/pipeline";
import { CategoriseFilesResult } from "./categoriseFiles";
import { Config } from "@domain";
import { GetTransformer } from "@application/transformation";

type TransformFilesResult = { buildFiles: File[]; config: Config };

const makeTransformFiles =
  (getTransformer: GetTransformer): Step<CategoriseFilesResult, TransformFilesResult> =>
  async ({ files, config }) => {
    const results = await Promise.allSettled(files.map((f) => getTransformer(f.category)(f)));

    const buildFiles = results
      .filter((r): r is PromiseFulfilledResult<File> => isFulfilled(r) && !!r.value)
      .map((r) => r.value);

    return { buildFiles, config };
  };

export { TransformFilesResult, makeTransformFiles };
