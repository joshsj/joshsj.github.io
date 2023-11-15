import { IIdentifier } from "@core/behaviours/interfaces";
import { Asset } from "@core/models";
import { Config } from "@core/models/config";
import { File } from "@core/models/io";

class AssetIdentifier implements IIdentifier<Asset> {
  readonly for = "asset";

  constructor(private readonly config: Config) {}

  test({ dir, name: filename }: File): boolean {
    return dir.root === this.config.assetDir || (dir.root === this.config.postDir && !!filename.base);
  }
}

export { AssetIdentifier };
