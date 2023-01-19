import { Config, SomethingCategory, Something } from "@domain";
import { File } from "@domain/io";

type SetDefaultConfigResult = { config: Config };

type LoadConfigResult = Pick<SetDefaultConfigResult, keyof SetDefaultConfigResult>;

type ReadSourceState = { sourcePaths?: string[] };

type ReadSourceResult = { sourceFiles: File[] };

type CategorisedFile = File & { category: SomethingCategory };

type CategoriseFilesResult = { files: CategorisedFile[] };

type ExtractDataResult = { somethings: Something[] };

type TransformFilesResult = { buildFiles: File[] };

export {
  SetDefaultConfigResult,
  LoadConfigResult,
  ReadSourceState,
  ReadSourceResult,
  CategorisedFile,
  CategoriseFilesResult,
  ExtractDataResult,
  TransformFilesResult,
};
