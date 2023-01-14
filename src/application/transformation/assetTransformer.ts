import { Config, File } from "../../domain";
import { FileTransformer } from "./types";

class AssetTransformer implements FileTransformer {
  constructor(private readonly config: Config) {}

  transforms({ segments }: File): boolean {
    return segments.at(0) === this.config.assetDir;
  }

  async transform(file: File): Promise<File> {
    return File.with(file, { segments: file.segments.slice(1) });
  }
}

export { AssetTransformer };
