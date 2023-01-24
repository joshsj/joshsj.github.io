import { isFulfilled, isRejected } from "@lib/utils";
import { Step } from "@lib/pipeline";
import { Config, Something } from "@domain";
import { Log } from "@application/logging";
import { Context, ExtractDataResult, TransformFilesResult } from "./types";
import { Transformers } from "@application/transformation";

const transformFiles =
  (transformers: Transformers, log: Log, config: Config): Step<ExtractDataResult, TransformFilesResult> =>
  async (somethings) => {
    const context = (current: Something): Context => ({ current, posts: somethings.post });

    const results = await Promise.allSettled(
      [...somethings.asset, ...somethings.page, ...somethings.post].map((s) =>
        transformers[s.category](context(s), config)
      )
    );

    const buildFiles = results.filter(isFulfilled).map((r) => r.value);

    log(
      "Failures:",
      results.filter(isRejected).map((r) => r.reason)
    );

    return { buildFiles };
  };

export { transformFiles };
