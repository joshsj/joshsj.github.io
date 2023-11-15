import { IStep } from "@kernel/pipeline/interfaces";
import { ReadSourceState } from "@core/models/steps";

export type IGeneratePipeline = IStep<ReadSourceState, void>;
