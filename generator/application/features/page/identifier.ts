
import { Config } from "@models/config";
import { Identifier } from "@application/types/behaviours";

const makePageIdentifier = ({ pageDir }: Config): Identifier<"page"> => ({
  test: ({ segments, extension }) => segments.at(0) === pageDir && extension === ".pug",
  name: "page",
});

export { makePageIdentifier };
