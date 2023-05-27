import { Entity, EntityName } from "@models";
import { File } from "@models/io";

type Copy<T extends {}> = Pick<T, keyof T>;

type InitialState = { sourcePaths?: string[] };

type ReadSourceState = Copy<InitialState>;
type ReadSourceResult = { sourceFiles: File[] };

type Identified = Pick<Entity, "file" | "name">;
type IdentifiedFor<T extends EntityName> = Identified & { name: T };

type IdentifyFilesResult = { files: Identified[] };

type ExtractDataResult = { entitys: Entity[] };

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
