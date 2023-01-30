import { Config, Something, SomethingCategory } from "@domain";
import { File } from "@domain/io";
import { SiteContext } from "./context";

type SetDefaultConfigResult = { config: Config };

type LoadEnvResult = Pick<SetDefaultConfigResult, keyof SetDefaultConfigResult>;

type ReadSourceState = { sourcePaths?: string[] };

type ReadSourceResult = { sourceFiles: File[] };

type CategorisedFile = File & { category: SomethingCategory };

type CategoriseFilesResult = { files: CategorisedFile[] };

type ExtractDataResult = { somethings: Something[] };

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
