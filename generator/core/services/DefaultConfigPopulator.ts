import { Config } from "@core/models";
import { IConfigPopulator, IIO } from "./interfaces";

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
      watch: false,
      draft: false,
    };
  }
}

export { DefaultConfigPopulator };
