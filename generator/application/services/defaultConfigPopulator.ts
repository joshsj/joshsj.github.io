import { Config } from "@models";
import { IConfigPopulator, IIO } from "./types";

class DefaultConfigPopulator implements IConfigPopulator {
  constructor(private readonly io: IIO) {}

  populate(): Partial<Config> {
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

export { DefaultConfigPopulator };
