import { Locators } from "./types";

const locators: Locators = {
  asset: (file) => file.with({ segments: file.segments.slice(1) }),
  collection: undefined,
  page: (file) =>
    file.with({
      segments: [],
      extension: ".html",
    }),
  post: (file) =>
    file.with({
      segments: ["blog", ...file.segments.slice(1)],
      name: "index",
      extension: ".html",
    }),
  postAsset: (file) =>
    file.with({
      segments: ["blog", ...file.segments.slice(1)],
    }),
};

export { locators };
