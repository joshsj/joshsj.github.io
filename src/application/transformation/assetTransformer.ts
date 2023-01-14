import { Config } from "@domain";
import { File } from "@domain/io";
import { IFileTransformer } from "./types";

class AssetTransformer implements IFileTransformer {
  constructor(private readonly config: Config) {}

  transforms({ segments }: File): boolean {
    return segments.at(0) === this.config.assetDir;
  }

  async transform(file: File): Promise<File> {
    return File.with(file, { segments: file.segments.slice(1) });
  }
}

export { AssetTransformer };
