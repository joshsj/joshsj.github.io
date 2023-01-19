import { GetCategory } from "@application/categorisation";
import { Logger } from "@application/logging";
import { Config, SomethingCategory } from "@domain";
import { Step } from "@lib/pipeline";
import { CategorisedFile, CategoriseFilesResult } from "./types";
import { ReadSourceResult } from "./readSource";

type Counts = { [K in SomethingCategory]: number };

const categoriseFiles =
  (getCategory: GetCategory, log: Logger, config: Config): Step<ReadSourceResult, CategoriseFilesResult> =>
  async ({ sourceFiles }) => {
    const files: CategorisedFile[] = [];
    const counts: Counts = { asset: 0, page: 0, post: 0 };

    for (const file of sourceFiles) {
      const category = getCategory(file, config);

      if (!category) {
        log(`Failed to identify file: ${file.full}`);
        continue;
      }

      ++counts[category];

      files.push(Object.assign({}, file, { category }));
    }

    log(
      "Categorised files " +
        Object.entries(counts)
          .map(([cat, n]) => cat + "=" + n)
          .join(", ")
    );

    return { config, files };
  };

export { CategorisedFile, CategoriseFilesResult, categoriseFiles };
