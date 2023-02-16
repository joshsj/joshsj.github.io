import { Identifier } from "@common/identification";
import { Config } from "@models/config";

const makeCollectionIdentifier = ({ postDir }: Config): Identifier<"collection"> => ({
  test: ({ segments, name, extension }) =>
    segments.at(0) === postDir && segments.length === 2 && !name && extension === ".yml",
  name: "collection",
});

export { makeCollectionIdentifier };
