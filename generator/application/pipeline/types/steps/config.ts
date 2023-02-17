import { Config } from "@models";
import { Step } from "../pipeline";

type SetDefaultConfigResult = { config: Config };
type SetDefaultConfigStep = Step<void, SetDefaultConfigResult>;

type ApplyConfigProvidersResult = { config: Config };
type ApplyConfigProvidersStep = Step<SetDefaultConfigResult, ApplyConfigProvidersResult>;

export { SetDefaultConfigResult, SetDefaultConfigStep, ApplyConfigProvidersResult, ApplyConfigProvidersStep };
