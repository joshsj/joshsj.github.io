import { Config, FileCategory } from "@domain";
import { File } from "@domain/io";
import { Step } from "@lib/link";
import { ReadSourceResult } from "./readSource";

type CategorisedFile = { file: File; category: FileCategory }; // TODO combine?

type CategoriseFilesResult = { config: Config; files: CategorisedFile[] };

const categoriseFiles: Step<ReadSourceResult, CategoriseFilesResult, void> =
  (next) =>
  async ({ sourceFiles, config }) => {
    const files: CategorisedFile[] = [];

    for (const file of sourceFiles) {
      const category = identify(file, config);

      if (category) {
        files.push({ file, category });
      }
    }

    return await next({ config, files });
  };

type Identifiers = { [K in FileCategory]: (file: File, config: Config) => boolean };

const identifiers: Identifiers = {
  asset: ({ segments }, { assetDir }) => segments.at(0) === assetDir,
  page: ({ extension, segments }, { pageDir }) => extension === ".pug" && segments.at(0) === pageDir,
};

const identify = (file: File, config: Config): FileCategory | undefined => {
  let category: FileCategory;

  for (category in identifiers) {
    const identified = identifiers[category](file, config);

    if (identified) {
      return category;
    }
  }
};

export { CategorisedFile, CategoriseFilesResult, categoriseFiles };
