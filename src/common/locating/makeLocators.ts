import { Config } from "@entities/config";
import { Locators } from "@common/locating/locator";
import { makeAssetLocator } from "@features/asset";
import { pageLocator } from "@features/page";
import { postLocator } from "@features/post";

const makeLocators = (config: Config): Locators => ({
  asset: makeAssetLocator(config),
  collection: undefined,
  page: pageLocator,
  post: postLocator,
});

export { makeLocators }