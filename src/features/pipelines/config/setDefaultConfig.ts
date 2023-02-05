import { Log } from "@common/logging";
import { Step } from "@common/pipeline";
import { normalize } from "path";
import { UpdateConfigResult } from ".";

const setDefaultConfig =
  (log: Log): Step<void, UpdateConfigResult> =>
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
