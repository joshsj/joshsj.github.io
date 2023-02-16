import { makeAssetIdentifier } from "@application/features/asset";
import { makePageIdentifier } from "@application/features/page";
import { makePostIdentifier } from "@application/features/post";
import { makeCollectionIdentifier } from "@application/features/collection";
import { Config } from "@models";
import { Identifiers } from "@application/types/services/identifiers";

const makeIdentifiers = (config: Config): Identifiers => [ makeAssetIdentifier, makePageIdentifier, makePostIdentifier, makeCollectionIdentifier ].map((i) =>
  i(config)
);

export { makeIdentifiers }