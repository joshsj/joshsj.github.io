import { Feature } from "@models";
import { File } from "@models/io";
import { Step } from "../pipeline";

type Copy<T extends {}> = Pick<T, keyof T>

type InitialState = { sourcePaths?: string[] };

type ReadSourceResult = { sourceFiles: File[] };
type ReadSourceStep = Step<InitialState, ReadSourceResult>;

type Identified = Pick<Feature, "file" | "name">;
type IdentifyFilesResult = { files: Identified[] };
type IdentifyFilesStep = Step<ReadSourceResult, IdentifyFilesResult>;

type ExtractDataResult = { features: Feature[] };
type ExtractDataStep = Step<IdentifyFilesResult, ExtractDataResult>;

type UpdateStoreResult = Copy<ExtractDataResult>
type UpdateStoreStep = Step<ExtractDataResult, UpdateStoreResult>;

type AddDependenciesResult = Copy<UpdateStoreResult>;
type AddDependenciesStep = Step<UpdateStoreResult, AddDependenciesResult>;

type TransformFilesResult = { buildFiles: File[] };
type TransformFilesStep = Step<AddDependenciesResult, TransformFilesResult>;

type WriteBuildStep = Step<TransformFilesResult, void>;

export {
  InitialState,
  ReadSourceResult,
  ReadSourceStep,
  Identified,
  IdentifyFilesResult,
  IdentifyFilesStep,
  ExtractDataResult,
  ExtractDataStep,
  UpdateStoreResult,
  UpdateStoreStep,
  AddDependenciesStep,
  AddDependenciesResult,
  TransformFilesResult,
  TransformFilesStep,
  WriteBuildStep,
};
