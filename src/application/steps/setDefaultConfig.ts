import { Config } from "@domain";
import { Step } from "@lib/step";

type SetDefaultConfigResult = { config: Config };

const setDefaultConfig: Step<{}, SetDefaultConfigResult> = (next) => async () => {
  const config = {
    config: {
      sourceDir: "",
      buildDir: "",
      assetDir: "public",
      pageDir: "pages",
    },
  };

  await next?.(config);

  return config;
};

export { SetDefaultConfigResult, setDefaultConfig };
