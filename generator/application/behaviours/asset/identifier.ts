import { Config } from "@models/config";
import { IIdentifier } from "@application/behaviours/types";
import { Asset } from "@models";
import { File } from "@models/io";

class AssetIdentifier implements IIdentifier<Asset> {
  constructor(private readonly config: Config) {}

  readonly name = "asset";

  test({ dir, name: filename }: File): boolean {
    return dir.root === this.config.assetDir || (dir.root === this.config.postDir && !!filename.base);
  }
}

export { AssetIdentifier };
