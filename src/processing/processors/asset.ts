import { IConfig } from "../../config";
import { Location } from "../location";
import { IContent, ILocation, IProcessor } from "../types";

class AssetProcessor implements IProcessor {
  constructor(private readonly config: IConfig) {}

  processes({ segments }: ILocation): boolean {
    return segments.at(0) === this.config.assetDir;
  }

  async process(location: ILocation, source: string): Promise<IContent> {
    return {
      data: source,
      // Remove asset folder
      location: new Location(
        location.segments.slice(1),
        location.name,
        location.extension,
        location.sep
      ),
    };
  }
}

export { AssetProcessor };
