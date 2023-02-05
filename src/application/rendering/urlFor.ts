import { SiteContext, UrlFor } from "@application/steps/context";
import { Locators } from "@application/transformation";
import { Something } from "@domain";

const urlFor = (context: SiteContext, locators: Locators): UrlFor => {
  const cache = new Map<Something, string>();

  return (cos, filename) => {
    const something = typeof cos === "string" ? context.find((x) => x.file.name === filename) : cos;

    if (!something) {
      throw new Error(`urlFor failed with: ${cos}, ${filename}`);
    }

    if (cache.has(something)) {
      return cache.get(something)!;
    }

    const locator = locators[something.category];

    if (!locator) {
      throw new Error(`urlFor failed with: ${cos}, ${filename}`);
    }

    const { full, sep } = locator(something.file);
    const url = (full.startsWith(sep) ? full : sep + full).replace("index.html", "");

    return cache.set(something, url).get(something)!;
  };
};

export { urlFor };
