import { IIdentifier } from "@application/behaviours/interfaces";
import { Config } from "@models/config";
import { File } from "@models/io";

class AssetIdentifier implements IIdentifier<"asset"> {
  readonly for = "asset";

  constructor(private readonly config: Config) {}

  test({ dir, name: filename }: File): boolean {
    return dir.root === this.config.assetDir || (dir.root === this.config.postDir && !!filename.base);
  }
}

export { AssetIdentifier };
