import { IO } from "@application/services/types/io";
import { Log } from "@application/services/types";
import { Step } from "@application/pipeline/types";
import { Config } from "@models/config";

type SetDefaultConfigResult = { config: Config };

const makeSetDefaultConfig =
  (io: IO, log: Log): Step<void, SetDefaultConfigResult> =>
  async () => {
    const config: Config = {
      rootDir: io.cwd(),
      sourceDir: ".",
      buildDir: ".",
      assetDir: "assets",
      pageDir: "pages",
      postDir: "posts",
      debug: false,
      watch: false,
      draft: false,
    };

    log("Set default configuration");

    return { config };
  };

export { SetDefaultConfigResult, makeSetDefaultConfig };
