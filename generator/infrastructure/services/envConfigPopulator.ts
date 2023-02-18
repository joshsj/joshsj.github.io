import { ConfigPopulator, Log } from "@application/services/types";
import { Key } from "@models/config";

type Env = { [K in `${Uppercase<Key>}_DIR`]?: string };

const makeEnvConfigProvider = (): ConfigPopulator => () => {
  const env = process.env as Env;

  const config = {
    rootDir: env.ROOT_DIR,
    sourceDir: env.SOURCE_DIR,
    buildDir: env.BUILD_DIR,
    assetDir: env.ASSET_DIR,
    pageDir: env.PAGE_DIR,
    postDir: env.POST_DIR,
  };

  return config;
};

export { makeEnvConfigProvider };
