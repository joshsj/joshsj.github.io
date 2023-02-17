import { makeAssetIdentifier } from "@application/behaviours/asset";
import { makePageIdentifier } from "@application/behaviours/page";
import { makePostIdentifier } from "@application/behaviours/post";
import { makeCollectionIdentifier } from "@application/behaviours/collection";
import { Config } from "@models";
import { Identifiers } from "./types";

const makeIdentifiers = (config: Config): Identifiers =>
  [makeAssetIdentifier, makePageIdentifier, makePostIdentifier, makeCollectionIdentifier].map((i) => i(config));

export { makeIdentifiers };
