import {
  ExtractDataResult,
  IdentifyFilesResult,
  ReadSourceResult,
  ReadSourceState,
  TransformFilesResult,
} from "@models/steps";
import { IStep } from "./pipeline";

type IReadSourceStep = IStep<ReadSourceState, ReadSourceResult>;

type IIdentifyFilesStep = IStep<ReadSourceResult, IdentifyFilesResult>;

type IExtractDataStep = IStep<IdentifyFilesResult, ExtractDataResult>;

type IUpdateStoreStep = IStep<ExtractDataResult>;

type IAddFileDependenciesStep = IStep<ExtractDataResult>;

type ITransformFilesStep = IStep<ExtractDataResult, TransformFilesResult>;

type IWriteBuildStep = IStep<TransformFilesResult, void>;

export {
  IReadSourceStep,
  IIdentifyFilesStep,
  IExtractDataStep,
  IUpdateStoreStep,
  IAddFileDependenciesStep,
  ITransformFilesStep,
  IWriteBuildStep,
};
