import { IConfigPopulator, ILogger } from "@application/services/interfaces";
import { Config, Key } from "@models/config";

type Env = { [K in `${Uppercase<Key>}_DIR`]?: string };

class EnvConfigProvider implements IConfigPopulator {
  populate(): Partial<Config> {
    const env = process.env as Env;

    return {
      rootDir: env.ROOT_DIR,
      sourceDir: env.SOURCE_DIR,
      buildDir: env.BUILD_DIR,
      assetDir: env.ASSET_DIR,
      pageDir: env.PAGE_DIR,
      postDir: env.POST_DIR,
    };
  }
}

export { EnvConfigProvider };
