import { Identifier } from "@common/identification/identifier";
import { Config } from "@entities/config";

const makeAssetIdentifier = ({ assetDir, postDir }: Config): Identifier<"asset"> => ({
  test: ({ segments, name }) => segments.at(0) === assetDir || (segments.at(0) === postDir && !!name),
  name: "asset",
});

export { makeAssetIdentifier };
