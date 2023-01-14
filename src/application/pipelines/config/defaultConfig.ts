import { Config } from "@domain";
import { IStep } from "@lib/pipelineBuilder";

type DefaultConfigResult = { config: Config };

class DefaultConfigStep implements IStep<DefaultConfigResult> {
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
