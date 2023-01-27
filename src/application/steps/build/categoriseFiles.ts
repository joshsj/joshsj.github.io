import { GetCategory } from "@application/categorisation";
import { Log } from "@application/logging";
import { Config, isFulfilled, isRejected } from "@domain";
import { Step } from "@lib/pipeline";
import { CategoriseFilesResult, ReadSourceResult } from "@application/steps";

const categoriseFiles =
  (getCategory: GetCategory, log: Log, config: Config): Step<ReadSourceResult, CategoriseFilesResult> =>
  async ({ sourceFiles, context }) => {
    const results = await Promise.allSettled(sourceFiles.map(async (file) => {
      const category = getCategory(file, config);

      if (!category) {
        log(`Failed to categorise file: ${file.full}`);
        throw file.full;
      }

      return Object.assign(file, { category });
    }));

    const files = results.filter(isFulfilled).map(r => r.value);

    log(`Categorised ${files.length}/${sourceFiles.length} source files`);
    log("Failures", results.filter(isRejected).map(r => r.reason));

    return { files, context };
  };

export { categoriseFiles };
