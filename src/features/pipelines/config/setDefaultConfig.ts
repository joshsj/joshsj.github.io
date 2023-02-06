import { Log } from "@common/logging";
import { Step } from "@common/pipeline";
import { Config } from "@entities/config";

type SetDefaultConfigResult = { config: Config };

const makeSetDefaultConfig =
  (config: Config, log: Log): Step<void, SetDefaultConfigResult> =>
  async () => {
    log("Set default configuration");

    return { config };
  };

export { SetDefaultConfigResult, makeSetDefaultConfig };
