import { Config } from "@models";
import { IConfigPopulator, IO } from "./types";

class DefaultConfigProvider implements IConfigPopulator {
  constructor(private readonly io: IO) {}

  populate(current: Config): Partial<Config> {
    return {
      rootDir: this.io.cwd(),
      sourceDir: ".",
      buildDir: ".",
      assetDir: "assets",
      pageDir: "pages",
      postDir: "posts",
      debug: false,
      watch: false,
      draft: false,
    };
  }
}

export { DefaultConfigProvider };
