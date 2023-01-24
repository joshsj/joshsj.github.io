import { Config, SomethingCategory, SomethingFor } from "@domain";
import { File } from "@domain/io";

type SetDefaultConfigResult = { config: Config };

type LoadEnvResult = Pick<SetDefaultConfigResult, keyof SetDefaultConfigResult>;

type ReadSourceState = { sourcePaths?: string[] };

type ReadSourceResult = { sourceFiles: File[] };

// TODO pluralise
type CategoriseFilesResult = { [K in SomethingCategory]: File[] };

type ExtractDataResult = { [K in SomethingCategory]: SomethingFor<K>[] };

type TransformFilesResult = { buildFiles: File[] };

export {
  SetDefaultConfigResult,
  LoadEnvResult,
  ReadSourceState,
  ReadSourceResult,
  CategoriseFilesResult,
  ExtractDataResult,
  TransformFilesResult,
};
