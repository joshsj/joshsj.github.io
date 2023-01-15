import { Config } from "@domain";
import { Step } from "@lib/link";

type SetDefaultConfigResult = { config: Config };

const setDefaultConfig: Step<{}, SetDefaultConfigResult, void> = (next) => async () =>
  await next({
    config: {
      sourceDir: "",
      buildDir: "",
      assetDir: "public",
      pageDir: "pages",
    },
  });

export { SetDefaultConfigResult, setDefaultConfig };
