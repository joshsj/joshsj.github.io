import { Config } from "@domain";
import { Step } from "@lib/pipeline";
import { normalize } from "path";

type SetDefaultConfigResult = { config: Config };

const setDefaultConfig: Step<void, SetDefaultConfigResult> = async () => ({
  config: {
    rootDir: normalize(process.cwd()),
    sourceDir: ".",
    buildDir: ".",
    assetDir: "public",
    pageDir: "pages",
    postDir: "posts",
  },
});

export { SetDefaultConfigResult, setDefaultConfig };
