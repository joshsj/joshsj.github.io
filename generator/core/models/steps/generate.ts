import { Resource, ResourceName } from "@core/models";
import { File } from "@core/models/io";

type Copy<T extends {}> = Pick<T, keyof T>;

type InitialState = { sourcePaths?: string[] };

type ReadSourceState = Copy<InitialState>;
type ReadSourceResult = { sourceFiles: File[] };

type Identified<T extends Resource = Resource> = Pick<T, "file" | "name">;

type IdentifyFilesResult = { files: Identified[] };

type ExtractDataResult = { resources: Resource[] };

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
