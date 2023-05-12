import { ILocatorProvider } from "@application/behaviours/types";
import { IFeatureStore } from "@application/stores/types";
import { Feature, FeatureName } from "@models";
import { IGetUrl } from "./types";

class GetUrl implements IGetUrl {
  private readonly cache: Map<Feature, string>;

  constructor(private readonly store: IFeatureStore, private readonly locatorFactory: ILocatorProvider) {
    this.cache = new Map<Feature, string>();
  }

  for(name: FeatureName, filename: string): string;
  for(feature: Feature): string;
  for(arg: Feature | FeatureName, filename?: string): string {
    const feature = typeof arg === "object" ? arg : this.store.allBy(arg).find((x) => x.file.name === filename);

    if (!feature) {
      throw new Error(`urlFor failed with: ${arg}, ${filename}`);
    }

    if (this.cache.has(feature)) {
      return this.cache.get(feature)!;
    }

    const locator = this.locatorFactory.get(feature.name);

    if (!locator) {
      throw new Error(`urlFor failed with: ${arg}, ${filename}`);
    }

    let { full: url, sep } = locator.locate(feature);

    // Ensure starts at root
    if (url.at(0) !== sep) {
      url = sep + url;
    }

    // Remove more ugly
    url = url.replace("index.html", "");

    return this.cache.set(feature, url).get(feature)!;
  }
}

export { GetUrl };
