import { Locator } from "@application/behaviours/types";

const pageLocator: Locator = (file) =>
  file.with({
    segments: [],
    extension: ".html",
  });

export { pageLocator };
