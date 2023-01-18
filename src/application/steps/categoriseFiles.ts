import { GetCategory } from "@application/categorisation";
import { Config, SomethingCategory } from "@domain";
import { File } from "@domain/io";
import { Step } from "@lib/pipeline";
import { ReadSourceResult } from "./readSource";

type CategorisedFile = File & { category: SomethingCategory };

type CategoriseFilesResult = { config: Config; files: CategorisedFile[] };

const makeCategoriseFiles =
  (getCategory: GetCategory): Step<ReadSourceResult, CategoriseFilesResult> =>
  async ({ sourceFiles, config }) => {
    const files: CategorisedFile[] = [];

    for (const file of sourceFiles) {
      const category = getCategory(file, config);

      if (category) {
        files.push(Object.assign({}, file, { category }));
      }
    }

    return { config, files };
  };

export { CategorisedFile, CategoriseFilesResult, makeCategoriseFiles };
