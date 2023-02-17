import { Config } from "@models/config";
import { Identifier } from "@application/behaviours/types";

const makeAssetIdentifier = ({ assetDir, postDir }: Config): Identifier<"asset"> => ({
  test: ({ segments, name }) => segments.at(0) === assetDir || (segments.at(0) === postDir && !!name),
  name: "asset",
});

export { makeAssetIdentifier };
