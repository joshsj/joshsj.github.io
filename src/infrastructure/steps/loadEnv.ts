import path from "path";
import { Step } from "@lib/pipeline";
import { Logger } from "@application/logging";
import { ConfigKey } from "@domain";
import { LoadEnvResult, SetDefaultConfigResult } from "@application/steps";

type Env = { [K in `${Uppercase<ConfigKey>}_DIR`]?: string }

const loadEnv =
  (log: Logger): Step<SetDefaultConfigResult, LoadEnvResult> =>
  async ({ config: _default }) => {
    const env = process.env as Env;
    const rootDir = env.ROOT_DIR || _default.rootDir;

    const config = Object.assign(_default, {
      rootDir,

      sourceDir: env.SOURCE_DIR ? path.resolve(rootDir, env.SOURCE_DIR) : _default.sourceDir,

      buildDir: env.BUILD_DIR ? path.resolve(rootDir, env.BUILD_DIR) : _default.buildDir,

      assetDir: env.ASSET_DIR || _default.assetDir,
      pageDir: env.PAGE_DIR || _default.pageDir,
      postDir: env.POST_DIR || _default.postDir
    });

    log("Loaded configuration from env", config);

    return { config };
  };

export { LoadEnvResult, loadEnv };
