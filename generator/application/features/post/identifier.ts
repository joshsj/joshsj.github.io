import { Identifier } from "@application/types/behaviours";
import { Config } from "@models/config";

const makePostIdentifier = ({ postDir }: Config): Identifier<"post"> => ({
  test: ({ segments, extension }) => segments.at(0) === postDir && extension === ".pug",
  name: "post",
});

export { makePostIdentifier };
