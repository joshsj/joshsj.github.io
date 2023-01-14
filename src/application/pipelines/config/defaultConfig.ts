import { Config } from "../../../domain";
import { Step } from "../../../lib";

type DefaultConfigResult = { config: Config };

class DefaultConfigStep implements Step<DefaultConfigResult> {
  async execute() {
    const config: Config = {
      sourceDir: "",
      buildDir: "",
      assetDir: "public",
      pageDir: "pages",
    };

    return { config };
  }
}

export { DefaultConfigResult, DefaultConfigStep };
