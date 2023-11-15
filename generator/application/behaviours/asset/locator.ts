import { Config } from "@models/config";
import { ILocator } from "@application/behaviours/interfaces";
import { Asset } from "@models";
import { File } from "@models/io";

class AssetLocator implements ILocator<Asset> {
  readonly for = "asset";

  constructor(private readonly config: Config) {}

  locate({ file }: Asset): File {
    const { dir } = file;

    // TODO factory?
    const segments =
      dir.root === this.config.assetDir
        ? dir.segments.slice(1) // Static
        : ["blog", ...dir.segments.slice(1)]; // Post

    return file.with({ dir: dir.with({ segments }) });
  }
}

export { AssetLocator };
