import { Identifier } from "@common/identification/identifier";
import { Config } from "@entities/config";

const makePostIdentifier = ({ postDir }: Config): Identifier<"post"> => ({
  test: ({ segments, extension }) => segments.at(0) === postDir && extension === ".pug",
  name: "post",
});

export { makePostIdentifier };
