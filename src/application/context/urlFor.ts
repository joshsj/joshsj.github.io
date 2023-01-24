import { File } from "@domain/io";
import { ContextData, UrlFor } from "./types";
import { Transformers } from "@application/transformation";

const urlFor =
  (data: ContextData, transformers: Transformers): UrlFor => {
    const cache = new Map<string, string>();

    return (category, filename) => {
      const key = category + filename;

      if (cache.has(key)) {
        return cache.get(key)!;
      }

      // TODO ???
      // @ts-ignore
      const file: File | undefined = data[category].find((x) => x.file.name === filename)?.file;

      if (!file) {
        return cache.set(key, "").get(key)!;
      }

      const { full, sep } = transformers[category].location(file);
      const url = full.startsWith(sep) ? full : sep + full;

      return cache.set(key, url).get(key)!;
    }
  };


export { urlFor };
