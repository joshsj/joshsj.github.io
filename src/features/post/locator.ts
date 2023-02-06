import { Locator } from "@common/locating";

const postLocator: Locator = (file) =>
  file.with({
    segments: ["blog", ...file.segments.slice(1)],
    name: "index",
    extension: ".html",
  });

export { postLocator };
