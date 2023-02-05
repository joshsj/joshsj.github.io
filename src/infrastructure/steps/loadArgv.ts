import { LoadConfigResult } from "@application/steps";
import { Step } from "@lib/pipeline";

const isSet = (arg: string) => process.argv.includes(`--${arg}`);

const loadArgv: Step<LoadConfigResult, LoadConfigResult> = async ({ config }) => {
  config.watch = isSet("watch");
  config.debug = isSet("debug");

  return { config };
};

export { loadArgv };
