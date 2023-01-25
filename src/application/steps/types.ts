import { Config, Something, SomethingCategory, } from "@domain";
import { File } from "@domain/io";
import { Context } from "./context";

type Make<T extends {}> = T & { context: Context }

type SetDefaultConfigResult = { config: Config };

type LoadEnvResult = Pick<SetDefaultConfigResult, keyof SetDefaultConfigResult>;

type ReadSourceState = Make<{ sourcePaths?: string[] }>;

type ReadSourceResult = Make<{ sourceFiles: File[] }>;

type CategorisedFile = File & { category: SomethingCategory };

type CategoriseFilesResult = Make<{ files: CategorisedFile[] }>;

type ExtractDataResult = Make<{ somethings: Something[] }>;

type TransformFilesResult = Make<{ buildFiles: File[] }>;

type WriteBuildResult = Make<{}>;

export {
  SetDefaultConfigResult,
  LoadEnvResult,
  ReadSourceState,
  ReadSourceResult,
  CategorisedFile,
  CategoriseFilesResult,
  ExtractDataResult,
  TransformFilesResult,
  WriteBuildResult
};
