import { GetCategory } from "@application/categorisation";
import { Log } from "@application/logging";
import { Config } from "@domain";
import { Step } from "@lib/pipeline";
import { CategorisedFile, CategoriseFilesResult, ReadSourceResult } from "./types";

const categoriseFiles =
  (getCategory: GetCategory, log: Log, config: Config): Step<ReadSourceResult, CategoriseFilesResult> =>
  async ({ sourceFiles }) => {
    const files: CategorisedFile[] = [];

    for (const file of sourceFiles) {
      const category = getCategory(file, config);

      if (!category) {
        log(`Failed to identify file: ${file.full}`);
        continue;
      }

      files.push(Object.assign(file, { category }));
    }

    log(`Successfully categorised${files.length}/${sourceFiles.length} source files`);

    return { files };
  };

export { categoriseFiles };
