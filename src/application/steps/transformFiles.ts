import { File } from "@domain/io";
import { isFulfilled } from "@domain/utils";
import { Transformers } from "@application/transformation";
import { Step } from "@lib/pipeline";
import { CategoriseFilesResult } from "./categoriseFiles";
import { Config } from "@domain";

type TransformFilesResult = { buildFiles: File[]; config: Config };

const makeTransformFiles =
  (transformers: Transformers): Step<CategoriseFilesResult, TransformFilesResult> =>
  async ({ files, config }) => {
    const results = await Promise.allSettled(files.map(({ file, category }) => transformers[category](file)));

    const buildFiles = results
      .filter((r): r is PromiseFulfilledResult<File> => isFulfilled(r) && !!r.value)
      .map((r) => r.value);

    return { buildFiles, config };
  };

export { TransformFilesResult, makeTransformFiles };
