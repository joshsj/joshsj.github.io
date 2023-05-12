import { ReadSourceState } from "@models/steps";
import { IStep } from "./pipeline";

type IUpdateConfigPipeline = IStep;

type IGeneratePipeline = IStep<ReadSourceState, void>;

export { IUpdateConfigPipeline, IGeneratePipeline };
