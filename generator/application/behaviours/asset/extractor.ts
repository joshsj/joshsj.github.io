import { Asset } from "@models";
import { Identified } from "@models/steps";
import { IExtractor } from "../interfaces";

class AssetExtractor implements IExtractor<Asset> {
  readonly for = "asset";

  async extract(i: Identified<Asset>): Promise<Asset> {
    return i;
  }
}

export { AssetExtractor };
