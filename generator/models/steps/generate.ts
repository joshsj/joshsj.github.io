import { Feature } from "@models";
import { File } from "@models/io";

type Copy<T extends {}> = Pick<T, keyof T>;

type InitialState = { sourcePaths?: string[] };

type ReadSourceState = Copy<InitialState>;
type ReadSourceResult = { sourceFiles: File[] };

type Identified = Pick<Feature, "file" | "name">;

type IdentifyFilesResult = { files: Identified[] };

type ExtractDataResult = { features: Feature[] };

type UpdateStoreResult = Copy<ExtractDataResult>;

type AddDependenciesResult = Copy<UpdateStoreResult>;

type TransformFilesResult = { buildFiles: File[] };

export {
  InitialState,
  ReadSourceState,
  ReadSourceResult,
  Identified,
  IdentifyFilesResult,
  ExtractDataResult,
  UpdateStoreResult,
  AddDependenciesResult,
  TransformFilesResult,
};
