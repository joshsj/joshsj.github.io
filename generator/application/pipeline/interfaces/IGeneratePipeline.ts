import { IStep } from "@kernel/pipeline/interfaces";
import { ReadSourceState } from "@models/steps";

export type IGeneratePipeline = IStep<ReadSourceState, void>;
