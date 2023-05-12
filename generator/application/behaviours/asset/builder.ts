import { IBuilder } from "@application/behaviours/types";
import { minifier } from "@application/utilities/minifier";
import { Asset } from "@models";

class AssetBuilder implements IBuilder<Asset> {
  async build({ file }: Asset): Promise<string> {
    return await minifier(file);
  }
}

export { AssetBuilder };
