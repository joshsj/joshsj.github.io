import { ConfigProvider, Log } from "@application/services/types";
import { Key } from "@models/config";

type Env = { [K in `${Uppercase<Key>}_DIR`]?: string };

const makeEnvConfigProvider =
  (log: Log): ConfigProvider =>
  (current) => {
    const env = process.env as Env;
    const rootDir = env.ROOT_DIR || current.rootDir;

    const config = {
      rootDir,

      sourceDir: env.SOURCE_DIR,
      buildDir: env.BUILD_DIR,

      assetDir: env.ASSET_DIR,
      pageDir: env.PAGE_DIR,
      postDir: env.POST_DIR,
    };

    log("Provided env to config");

    return config;
  };

export { makeEnvConfigProvider };
