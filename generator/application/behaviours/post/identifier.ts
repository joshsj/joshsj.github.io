import { Identifier } from "@application/behaviours/types";
import { Config } from "@models/config";

const makePostIdentifier = ({ postDir }: Config): Identifier<"post"> => ({
  test: ({ segments, extension }) => segments.at(0) === postDir && extension === ".pug",
  name: "post",
});

export { makePostIdentifier };