import { Resource, ResourceName } from "@models";
import { File } from "@models/io";

type Copy<T extends {}> = Pick<T, keyof T>;

type InitialState = { sourcePaths?: string[] };

type ReadSourceState = Copy<InitialState>;
type ReadSourceResult = { sourceFiles: File[] };

type Identified = Pick<Resource, "file" | "name">;
type IdentifiedFor<T extends ResourceName> = Identified & { name: T };

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
  IdentifiedFor,
  IdentifyFilesResult,
  ExtractDataResult,
  UpdateStoreResult,
  AddDependenciesResult,
  TransformFilesResult,
};
