import { IProcessor } from "..";
import { Config } from "../../configuration/types";
import { File } from "../../io";

class AssetProcessor implements IProcessor {
  constructor(private readonly config: Config) {}

  processes({ segments }: File): boolean {
    return segments.at(0) === this.config.assetDir;
  }

  async process(file: File): Promise<File> {
    return File.with(file, { segments: file.segments.slice(1) });
  }
}

export { AssetProcessor };
