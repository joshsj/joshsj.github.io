import { Config, FileCategory } from "@domain";
import { File } from "@domain/io";

type GetCategory = (file: File, config: Config) => FileCategory | undefined;

type Identifiers = { [K in FileCategory]: (file: File, config: Config) => boolean };

const identifiers: Identifiers = {
  asset: ({ segments }, { assetDir }) => segments.at(0) === assetDir,
  page: ({ extension, segments }, { pageDir }) => extension === ".pug" && segments.at(0) === pageDir,
};

const getCategory: GetCategory = (file, config) => {
  let category: FileCategory;

  for (category in identifiers) {
    const identified = identifiers[category](file, config);

    if (identified) {
      return category;
    }
  }
};

export { GetCategory, getCategory };
