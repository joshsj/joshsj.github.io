import { Log } from "@application/logging";
import { Transformers } from "@application/transformation";
import { Something } from "@domain";
import { Step } from "@lib/pipeline";
import { isFulfilled, isRejected } from "@lib/utils";
import { Context, ExtractDataResult, TransformFilesResult } from "./types";

const transformFiles =
  (transformers: Transformers, log: Log): Step<ExtractDataResult, TransformFilesResult> =>
  async (somethings) => {
    const context = (current: Something): Context => ({ current, posts: somethings.post });

    const results = await Promise.allSettled(
      [...somethings.asset, ...somethings.page, ...somethings.post].map(async (s) => {
        const { location, content } = transformers[s.category];

        return location(s.file).with({ content: await content(context(s)) });
      })
    );

    const buildFiles = results.filter(isFulfilled).map((r) => r.value);

    log(
      "Failures:",
      results.filter(isRejected).map((r) => r.reason)
    );

    return { buildFiles };
  };

export { transformFiles };
