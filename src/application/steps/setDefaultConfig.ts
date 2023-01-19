import { Logger } from "@application/logging";
import { Config } from "@domain";
import { Step } from "@lib/pipeline";
import { normalize } from "path";

type SetDefaultConfigResult = { config: Config };

const setDefaultConfig =
  (log: Logger): Step<void, SetDefaultConfigResult> =>
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
