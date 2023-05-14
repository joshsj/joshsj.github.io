import { Asset } from "@models";
import { IExtractor } from "../types";
import { File } from "@models/io";

class AssetExtractor implements IExtractor<Asset> {
  async extract(file: File): Promise<Asset> {
    return { name: "asset", file };
  }
}

export { AssetExtractor };
