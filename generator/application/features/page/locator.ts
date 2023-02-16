import { Locator } from "@application/types/behaviours";

const pageLocator: Locator = (file) =>
  file.with({
    segments: [],
    extension: ".html",
  });

export { pageLocator };
