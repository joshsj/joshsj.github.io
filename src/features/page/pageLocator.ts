import { Locator } from "@common/locator";

const pageLocator: Locator = (file) =>
  file.with({
    segments: [],
    extension: ".html",
  });

export { pageLocator };
