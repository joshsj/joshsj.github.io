import { IO } from "@application/types/services/io";
import { Log } from "@application/types/services";
import { Step } from "@application/types/pipeline";
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
