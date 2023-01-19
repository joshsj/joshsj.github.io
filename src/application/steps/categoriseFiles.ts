import { GetCategory } from "@application/categorisation";
import { Logger } from "@application/logging";
import { Config, SomethingCategory } from "@domain";
import { File } from "@domain/io";
import { Step } from "@lib/pipeline";
import { ReadSourceResult } from "./readSource";

type CategorisedFile = File & { category: SomethingCategory };

type CategoriseFilesResult = { files: CategorisedFile[] };

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
