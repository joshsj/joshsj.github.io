import { Config, Something, SomethingCategory, SomethingFor } from "@domain";
import { File } from "@domain/io";

type SetDefaultConfigResult = { config: Config };

type LoadEnvResult = Pick<SetDefaultConfigResult, keyof SetDefaultConfigResult>;

type ReadSourceState = { sourcePaths?: string[] };

type ReadSourceResult = { sourceFiles: File[] };

type CategorisedFile = File & { category: SomethingCategory };

type CategoriseFilesResult = { files: CategorisedFile[] };

type ExtractDataResult = { files: Something[] };

type TransformFilesResult = { buildFiles: File[] };

export {
  SetDefaultConfigResult,
  LoadEnvResult,
  ReadSourceState,
  ReadSourceResult,
  CategorisedFile,
  CategoriseFilesResult,
  ExtractDataResult,
  TransformFilesResult,
};
