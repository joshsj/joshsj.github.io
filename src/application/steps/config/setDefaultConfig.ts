import { Log } from "@application/logging";
import { Step } from "@lib/pipeline";
import { normalize } from "path";
import { LoadConfigResult } from "@application/steps";

const setDefaultConfig =
  (log: Log): Step<void, LoadConfigResult> =>
  async () => {
    log("Set default configuration");

    return {
      config: {
        rootDir: normalize(process.cwd()),
        sourceDir: ".",
        buildDir: ".",
        assetDir: "public",
        pageDir: "pages",
        postDir: "posts",

        debug: false,
        watch: false,
      },
    };
  };

export { setDefaultConfig };
