import { Asset } from "@models";
import { IdentifiedFor } from "@models/steps";
import { IExtractor } from "../interfaces";

class AssetExtractor implements IExtractor<"asset"> {
  readonly for = "asset";

  async extract(i: IdentifiedFor<"asset">): Promise<Asset> {
    return i;
  }
}

export { AssetExtractor };
