import { Locators } from "@common/locator";
import { FeatureStore } from "@common/stores";
import { Feature, FeatureName } from "@entities";

type UrlFor = ((name: FeatureName, filename: string) => string) & ((feature: Feature, filename?: undefined) => string);

const makeUrlFor = (store: FeatureStore, locators: Locators): UrlFor => {
  const cache = new Map<Feature, string>();

  return (cos, filename) => {
    const feature = typeof cos === "string" ? store.find((x) => x.file.name === filename) : cos;

    if (!feature) {
      throw new Error(`urlFor failed with: ${cos}, ${filename}`);
    }

    if (cache.has(feature)) {
      return cache.get(feature)!;
    }

    const locator = locators[feature.name];

    if (!locator) {
      throw new Error(`urlFor failed with: ${cos}, ${filename}`);
    }

    const { full, sep } = locator(feature.file);
    const url = (full.startsWith(sep) ? full : sep + full).replace("index.html", "");

    return cache.set(feature, url).get(feature)!;
  };
};

export { UrlFor, makeUrlFor };
