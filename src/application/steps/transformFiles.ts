import path from "path";
import { File } from "@domain/io";
import { isFulfilled } from "@domain/utils";
import { FileTransformer } from "@application/transformation";
import { Step } from "@lib/step";
import { CategorisedFile, CategoriseFilesResult } from "./categoriseFiles";
import { Config } from "@domain";

type TransformFilesResult = { buildFiles: File[]; config: Config };

const makeTransformFiles =
  (transformers: FileTransformer[]): Step<CategoriseFilesResult, TransformFilesResult> =>
  (next) =>
  async ({ files, config }) => {
    const transformFile = async ({ file, category }: CategorisedFile) => {
      const sourcePath = `${path.join(config.sourceDir, file.full)}`;
      const transformer = transformers.find((t) => t.transforms === category);

      if (!transformer) {
        throw new Error(`No processor found for ${sourcePath}`);
      }

      return await transformer.transform(file);
    };

    const results = await Promise.allSettled(files.map(transformFile));

    const result = {
      config,
      buildFiles: results
        .filter((r): r is PromiseFulfilledResult<File> => isFulfilled(r) && !!r.value)
        .map((r) => r.value),
    };

    await next?.(result);
    return result;
  };

export { TransformFilesResult, makeTransformFiles };
