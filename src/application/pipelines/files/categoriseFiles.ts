import { Config, FileCategory } from "@domain";
import { File } from "@domain/io";
import { IStep } from "@lib/pipelineBuilder";
import { ReadSourceResult } from "./readSource";

// TODO combine?
type CategorisedFile = { file: File; category: FileCategory };

type Identifiers = {
  [K in FileCategory]: (file: File, config: Config) => boolean;
};

type CategoriseFilesResult = { files: CategorisedFile[] };

class CategoriseFilesStep implements IStep<CategoriseFilesResult, ReadSourceResult> {
  constructor(private readonly config: Config) {}

  async execute({ sourceFiles }: ReadSourceResult): Promise<CategoriseFilesResult> {
    const files: CategorisedFile[] = [];

    for (const file of sourceFiles) {
      const category = this.identify(file);

      if (category) {
        files.push({ file, category });
      }
    }

    return { files };
  }

  private identify(file: File): FileCategory | undefined {
    let category: FileCategory;

    for (category in CategoriseFilesStep.identifiers) {
      const identified = CategoriseFilesStep.identifiers[category](file, this.config);

      if (identified) {
        return category;
      }
    }
  }

  private static readonly identifiers: Identifiers = {
    asset: ({ segments }, { assetDir }) => segments.at(0) === assetDir,
    page: ({ extension, segments }, { pageDir }) => extension === ".pug" && segments.at(0) === pageDir,
  };
}

export { CategorisedFile, CategoriseFilesResult, CategoriseFilesStep };
