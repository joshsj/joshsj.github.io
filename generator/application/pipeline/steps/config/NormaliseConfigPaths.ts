import { IStep } from "@kernel/pipeline/interfaces";
import { Config } from "@models";
import path from "path";

class NormaliseConfigPaths implements IStep {
  constructor(private readonly config: Config) {}
  async execute() {
    const keys = ["assetDir", "buildDir", "pageDir", "postDir", "sourceDir"] as const;

    for (const key of keys) {
      this.config[key] = path.normalize(this.config[key]);
    }
  }
}

export { NormaliseConfigPaths };
