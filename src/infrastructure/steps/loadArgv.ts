import { Step } from "@common/pipeline";
import { UpdateConfigResult } from "@features/pipelines/config";

const isSet = (arg: string) => process.argv.includes(`--${arg}`);

const loadArgv: Step<UpdateConfigResult, UpdateConfigResult> = async ({ config }) => {
  config.watch = isSet("watch");
  config.debug = isSet("debug");
  config.draft = isSet("draft");

  return { config };
};

export { loadArgv };
