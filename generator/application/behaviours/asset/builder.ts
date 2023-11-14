import { IBuilder } from "@application/behaviours/interfaces";
import { minifier } from "@kernel/utilities/minifier";
import { Asset } from "@models";

class AssetBuilder implements IBuilder<"asset"> {
  readonly for = "asset";

  async build({ file }: Asset): Promise<string> {
    return await minifier(file);
  }
}

export { AssetBuilder };
