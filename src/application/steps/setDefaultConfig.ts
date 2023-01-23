import { Log } from "@application/logging";
import { Step } from "@lib/pipeline";
import { normalize } from "path";
import { SetDefaultConfigResult } from "./types";

const setDefaultConfig =
  (log: Log): Step<void, SetDefaultConfigResult> =>
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
      },
    };
  };

export { SetDefaultConfigResult, setDefaultConfig };
