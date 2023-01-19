import path from "path";
import { Env } from "@domain";
import { SetDefaultConfigResult } from "./setDefaultConfig";
import { Step } from "@lib/pipeline";
import dotenv from "dotenv";
import { Logger } from "@application/logging";

type LoadConfigResult = Pick<SetDefaultConfigResult, keyof SetDefaultConfigResult>;

const loadConfig =
  (log: Logger): Step<SetDefaultConfigResult, LoadConfigResult> =>
  async ({ config: _default }) => {
    dotenv.config();

    const env = process.env as Env;
    const rootDir = env.ROOT_DIR || _default.rootDir;

    const config = Object.assign(_default, {
      rootDir,

      sourceDir: env.SOURCE_DIR ? path.resolve(rootDir, env.SOURCE_DIR) : _default.sourceDir,

      buildDir: env.BUILD_DIR ? path.resolve(rootDir, env.BUILD_DIR) : _default.buildDir,

      assetDir: env.ASSET_DIR || _default.assetDir,
      pageDir: env.PAGE_DIR || _default.pageDir,
    });

    log("Loaded configuration from env", config);

    return { config };
  };

export { LoadConfigResult, loadConfig };
