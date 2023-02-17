import { Config } from "@models/config";
import { makeAssetLocator } from "@application/behaviours/asset";
import { pageLocator } from "@application/behaviours/page";
import { postLocator } from "@application/behaviours/post";
import { Locators } from "./types";

const makeLocators = (config: Config): Locators => ({
  asset: makeAssetLocator(config),
  collection: undefined,
  page: pageLocator,
  post: postLocator,
});

export { makeLocators };
