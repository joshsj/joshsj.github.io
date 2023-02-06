import { Identifier } from "@common/identification/identifier";
import { Config } from "@entities/config";

const makePageIdentifier = ({ pageDir }: Config): Identifier<"page"> => ({
  test: ({ segments, extension }) => segments.at(0) === pageDir && extension === ".pug",
  name: "page",
});

export { makePageIdentifier };
