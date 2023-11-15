import { Config, D } from "@core/models";
import { DependencyContainer } from "tsyringe";

class EntryDependencies {
  private constructor(private readonly c: DependencyContainer) {}

  static create(container: DependencyContainer) {
    return new EntryDependencies(container);
  }

  register() {
    const baseConfig: Config = {
      // TODO should we be using process here?
      rootDir: process.cwd(),
      sourceDir: ".",
      buildDir: ".",
      assetDir: "assets",
      pageDir: "pages",
      postDir: "posts",
      watch: false,
      draft: false,
    };

    this.c.register<Config>(D.config, { useValue: baseConfig });
  }
}

export { EntryDependencies };
