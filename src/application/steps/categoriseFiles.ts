import { GetCategory } from "@application/categorisation";
import { Log } from "@application/logging";
import { Config, SomethingCategory } from "@domain";
import { Step } from "@lib/pipeline";
import { CategoriseFilesResult, ReadSourceResult } from "./types";

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

    log(
      "Categorised files " +
        Object.entries(result)
          .map(([cat, arr]) => cat + "=" + arr.length)
          .join(", ")
    );

    return result;
  };

export { categoriseFiles };
