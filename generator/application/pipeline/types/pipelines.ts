import { Step } from "./pipeline";
import { ApplyConfigProvidersStep } from "./steps/config";
import { InitialState } from "./steps/generate";

type UpdateConfigPipeline = ApplyConfigProvidersStep;

type GeneratePipeline = Step<InitialState, void>;

export { UpdateConfigPipeline, GeneratePipeline };
