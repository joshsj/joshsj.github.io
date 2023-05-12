import { Config } from "@models/config";
import { ILocator } from "@application/behaviours/types";
import { Asset } from "@models";
import { File } from "@models/io";

class AssetLocator implements ILocator<Asset> {
  constructor(private readonly config: Config) {}

  locate({ file }: Asset): File {
    // TODO factory?
    const segments =
      file.segments.at(0) === this.config.assetDir
        ? file.segments.slice(1) // Static
        : ["blog", ...file.segments.slice(1)]; // Post

    return file.with({ segments });
  }
}

export { AssetLocator };
