import { File } from "@domain/io";
import { FileTransformer } from "./types";

const assetTransformer: FileTransformer = {
  transforms: "asset",

  async transform(file: File): Promise<File> {
    return file.with({ segments: file.segments.slice(1) });
  },
};

export { assetTransformer };
