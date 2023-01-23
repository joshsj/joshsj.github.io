import { isFulfilled, isRejected } from "@lib/utils";
import { Step } from "@lib/pipeline";
import { Config, Post } from "@domain";
import { GetTransformer } from "@application/transformation";
import { ExtractDataResult } from "./extractData";
import { Logger } from "@application/logging";
import { TransformFilesResult } from "./types";

const transformFiles =
  (getTransformer: GetTransformer, log: Logger, config: Config): Step<ExtractDataResult, TransformFilesResult> =>
    async ({ somethings }) => {
      const posts = somethings.filter((s): s is Post => s.category === "post");

      const results = await Promise.allSettled(somethings.map((s) =>
        getTransformer(s.category)({ current: s, posts }, config)));

      const buildFiles = results.filter(isFulfilled).map((r) => r.value);

      log(
        "Failures:",
        results.filter(isRejected).map((r) => r.reason)
      );

      return { buildFiles };
    };

export { transformFiles };
