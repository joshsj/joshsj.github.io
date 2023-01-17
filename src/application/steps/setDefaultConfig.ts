import { Config } from "@domain";
import { Step } from "@lib/pipeline";

type SetDefaultConfigResult = { config: Config };

const setDefaultConfig: Step<void, SetDefaultConfigResult> = async () => ({
  config: {
    sourceDir: ".",
    buildDir: ".",
    assetDir: "public",
    pageDir: "pages",
    postDir: "posts",
  },
});

export { SetDefaultConfigResult, setDefaultConfig };
