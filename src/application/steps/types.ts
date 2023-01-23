import { Config, SomethingCategory, Something, Post } from "@domain";
import { File } from "@domain/io";

type SetDefaultConfigResult = { config: Config };

type LoadEnvResult = Pick<SetDefaultConfigResult, keyof SetDefaultConfigResult>;

type ReadSourceState = { sourcePaths?: string[] };

type ReadSourceResult = { sourceFiles: File[] };

type CategorisedFile = File & { category: SomethingCategory };

type CategoriseFilesResult = { files: CategorisedFile[] };

type ExtractDataResult = { somethings: Something[] };

type Context = { current: Something, posts: Post[] }

type TransformFilesResult = { buildFiles: File[] };

export {
  SetDefaultConfigResult,
  LoadEnvResult,
  ReadSourceState,
  ReadSourceResult,
  CategorisedFile,
  CategoriseFilesResult,
  ExtractDataResult,
  Context,
  TransformFilesResult,
};
