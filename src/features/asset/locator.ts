import { Locator } from "@common/locating";
import { Config } from "@models/config";

const makeAssetLocator =
  ({ assetDir }: Config): Locator =>
  (file) => {
    const segments =
      file.segments.at(0) === assetDir
        ? file.segments.slice(1) // Static
        : ["blog", ...file.segments.slice(1)]; // Post

    return file.with({ segments });
  };

export { makeAssetLocator };
