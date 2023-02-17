import { Locators } from "@application/behaviours/types";
import { UrlFor } from "@application/renderers/types";
import { FeatureStore } from "@application/stores/types";
import { Feature } from "@models";

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

    let { full: url, sep } = locator(feature.file);

    // Ensure starts at root
    if (url.at(0) !== sep) {
      url = sep + url;
    }

    // Remove more ugly
    url = url.replace("index.html", "");

    return cache.set(feature, url).get(feature)!;
  };
};

export { makeUrlFor };
