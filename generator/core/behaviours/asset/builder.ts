import { IBuilder } from "@core/behaviours/interfaces";
import { minifier } from "@kernel/utilities/minifier";
import { Asset } from "@core/models";

class AssetBuilder implements IBuilder<Asset> {
  readonly for = "asset";

  async build({ file }: Asset): Promise<string> {
    return await minifier(file);
  }
}

export { AssetBuilder };
