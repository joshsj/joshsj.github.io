import { File } from "@domain/io";
import { ContextData, UrlFor } from "./types";

const urlFor =
  (data: ContextData): UrlFor =>
  (category, filename) => {
    // TODO ???
    // @ts-ignore
    const file: File | undefined = data[category].find((x) => x.file.name === filename)?.file;

    if (!file) {
      return "";
    }

    const { full, sep } = file;

    return full.startsWith(sep) ? full : sep + full;
  };

export { urlFor };
