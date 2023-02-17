import { Feature } from "@models";
import { Step } from "../pipeline";

type InitialState = { sourcePaths?: string[] };

type ReadSourceResult = { sourceFiles: File[] };
type ReadSourceStep = Step<InitialState, ReadSourceResult>;

type Identified = Pick<Feature, "file" | "name">;
type IdentifyFilesResult = { files: Identified[] };
type IdentifyFilesStep = Step<ReadSourceResult, IdentifyFilesResult>;

type ExtractDataResult = { features: Feature[] };
type ExtractDataStep = Step<IdentifyFilesResult, ExtractDataResult>;

type UpdateStoreStep = Step<ExtractDataResult, void>;

type TransformFilesResult = { buildFiles: File[] };
type TransformFilesStep = Step<void, TransformFilesResult>;

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
  UpdateStoreStep,
  TransformFilesResult,
  TransformFilesStep,
  WriteBuildStep,
};
