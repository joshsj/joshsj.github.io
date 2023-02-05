import path from "path";
import { Step } from "@lib/pipeline";
import { Log } from "@application/logging";
import { Config, ConfigKey } from "@domain";
import { LoadConfigResult } from "@application/steps";

type Env = { [K in `${Uppercase<ConfigKey>}_DIR`]?: string };

const loadEnv =
  (log: Log): Step<LoadConfigResult, LoadConfigResult> =>
  async ({ config: _default }) => {
    const env = process.env as Env;
    const rootDir = env.ROOT_DIR || _default.rootDir;

    const config: Config = {
      rootDir,

      sourceDir: env.SOURCE_DIR ? path.resolve(rootDir, env.SOURCE_DIR) : _default.sourceDir,
      buildDir: env.BUILD_DIR ? path.resolve(rootDir, env.BUILD_DIR) : _default.buildDir,

      assetDir: env.ASSET_DIR || _default.assetDir,
      pageDir: env.PAGE_DIR || _default.pageDir,
      postDir: env.POST_DIR || _default.postDir,

      watch: _default.watch,
      debug: _default.debug,
    };

    log("Loaded env into config", [config]);

    return { config };
  };

export { loadEnv };
