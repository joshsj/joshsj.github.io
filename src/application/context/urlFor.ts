import { Transformers } from "@application/transformation";
import { Something } from "@domain";
import { SiteContext, UrlFor } from "@application/steps/context";

const urlFor = (context: SiteContext, transformers: Transformers): UrlFor => {
  const cache = new Map<Something, string>();

  return (kos, filename) => {
    const something = typeof kos === "string" ? context.find((x) => x.file.name === filename) : kos;

    if (!something) {
      throw new Error(`urlFor failed with: ${kos}, ${filename}`);
    }

    if (cache.has(something)) {
      return cache.get(something)!;
    }

    const { full, sep } = transformers[something.category].location(something.file);
    const url = (full.startsWith(sep) ? full : sep + full).replace("index.html", "");

    return cache.set(something, url).get(something)!;
  };
};

export { urlFor };
