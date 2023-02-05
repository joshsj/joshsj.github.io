import { Config, Something, SomethingCategory } from "@domain";
import { File } from "@domain/io";

type LoadConfigResult = { config: Config };

type ReadSourceState = { sourcePaths?: string[] };

type ReadSourceResult = { sourceFiles: File[] };

type CategorisedFile = File & { category: SomethingCategory };

type CategoriseFilesResult = { files: CategorisedFile[] };

type ExtractDataResult = { somethings: Something[] };

type UpdateSiteContextResult = void;

type TransformFilesResult = { buildFiles: File[] };

export {
  LoadConfigResult,
  ReadSourceState,
  ReadSourceResult,
  CategorisedFile,
  CategoriseFilesResult,
  ExtractDataResult,
  UpdateSiteContextResult,
  TransformFilesResult,
};
