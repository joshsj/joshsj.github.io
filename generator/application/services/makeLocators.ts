import { Config } from "@models/config";
import { makeAssetLocator } from "@application/features/asset";
import { pageLocator } from "@application/features/page";
import { postLocator } from "@application/features/post";
import { Locators } from "@application/types/services";

const makeLocators = (config: Config): Locators => ({
  asset: makeAssetLocator(config),
  collection: undefined,
  page: pageLocator,
  post: postLocator,
});

export { makeLocators }