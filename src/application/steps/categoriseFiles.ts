import { GetCategory } from "@application/categorisation";
import { Log } from "@application/logging";
import { Config } from "@domain";
import { Step } from "@lib/pipeline";
import { CategoriseFilesResult, ReadSourceResult } from "./types";
import { counts } from "./utils";

const categoriseFiles =
  (getCategory: GetCategory, log: Log, config: Config): Step<ReadSourceResult, CategoriseFilesResult> =>
  async ({ sourceFiles }) => {
    const result: CategoriseFilesResult = {
      asset: [],
      page: [],
      post: [],
    };

    for (const file of sourceFiles) {
      const category = getCategory(file, config);

      if (!category) {
        log(`Failed to identify file: ${file.full}`);
        continue;
      }

      result[category].push(Object.assign({}, file, { category }));
    }

    log("Categorised files " + counts(result));

    return result;
  };

export { categoriseFiles };
