import { Locator } from "@application/behaviours/types";

const pageLocator: Locator = (file) =>
  file.with({
    segments: file.name !== "index" ? [file.name] : [],
    name: "index",
    extension: ".html",
  });

export { pageLocator };
