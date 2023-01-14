import { Config, FileCategory } from "@domain";
import { File } from "@domain/io";
import { IFileTransformer } from "./types";

class AssetTransformer implements IFileTransformer {
  transforms: FileCategory = "asset";

  async transform(file: File): Promise<File> {
    return File.with(file, { segments: file.segments.slice(1) });
  }
}

export { AssetTransformer };
