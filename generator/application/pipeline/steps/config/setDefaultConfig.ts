import { IO } from "@application/services/types/io";
import { Log } from "@application/services/types";
import { Config } from "@models/config";
import { SetDefaultConfigStep } from "@application/pipeline/types/steps/config";

const makeSetDefaultConfig =
  (io: IO, log: Log): SetDefaultConfigStep =>
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

export { makeSetDefaultConfig };
