import { Config } from "@models/config";
import { Identifier } from "@application/behaviours/types";

const makeCollectionIdentifier = ({ postDir }: Config): Identifier<"collection"> => ({
  test: ({ segments, name, extension }) =>
    segments.at(0) === postDir && segments.length === 2 && !name && extension === ".yml",
  name: "collection",
});

export { makeCollectionIdentifier };
