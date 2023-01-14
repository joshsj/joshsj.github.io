import path from "path";
import { Env, Config } from "@domain";
import { IStep } from "@lib/pipelineBuilder";
import { ILogger } from "@application/logging";
import { DefaultConfigResult } from "./defaultConfig";

type LoadConfigResult = DefaultConfigResult;

class LoadConfigStep implements IStep<LoadConfigResult, DefaultConfigResult> {
  constructor(private readonly logger: ILogger) {}

  async execute({ config: _default }: DefaultConfigResult) {
    const base = process.cwd();
    const env = process.env as Env;

    const config: Config = Object.assign({}, _default, {
      sourceDir: env.SOURCE_DIR
        ? path.resolve(base, env.SOURCE_DIR)
        : _default.sourceDir,

      buildDir: env.BUILD_DIR
        ? path.resolve(base, env.BUILD_DIR)
        : _default.buildDir,

      assetDir: env.ASSET_DIR || _default.assetDir,
      pageDir: env.PAGE_DIR || _default.pageDir,
    });

    this.logger.log("Config");
    this.logger.log(config);

    return { config };
  }
}

export { LoadConfigResult, LoadConfigStep };
