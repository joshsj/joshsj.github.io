import { Config } from "@models/config";
import { IIdentifier } from "@application/behaviours/types";
import { Asset } from "@models";
import { File } from "@models/io";

class AssetIdentifier implements IIdentifier<Asset> {
  constructor(private readonly config: Config) {}

  readonly name = "asset";

  test({ segments, name }: File): boolean {
    return segments.at(0) === this.config.assetDir || (segments.at(0) === this.config.postDir && !!name);
  }
}

export { AssetIdentifier };
