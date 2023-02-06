import { Locator } from "@common/locating";

const pageLocator: Locator = (file) =>
  file.with({
    segments: [],
    extension: ".html",
  });

export { pageLocator };
