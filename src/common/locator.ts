import { FeatureName } from "@entities";
import { Config } from "@entities/config";
import { File } from "@entities/io";
import { makeAssetLocator } from "@features/asset/assetLocator";
import { pageLocator } from "@features/page/pageLocator";
import { postLocator } from "@features/post/postLocator";

type Locator = (file: File) => File;

type Locators = { [Name in FeatureName]: Locator | undefined };

const makeLocators = (config: Config): Locators => ({
  asset: makeAssetLocator(config),
  collection: undefined,
  page: pageLocator,
  post: postLocator,
});

export { Locator, Locators, makeLocators };
