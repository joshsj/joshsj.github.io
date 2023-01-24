import { Context, ContextData, GetContextHelpers } from "@application/context";
import { Log } from "@application/logging";
import { Transformers } from "@application/transformation";
import { Something, SomethingCategory, SomethingFor } from "@domain";
import { Step } from "@lib/pipeline";
import { isFulfilled, isRejected } from "@lib/utils";
import { ExtractDataResult, TransformFilesResult } from "./types";

const transformFiles =
  (
    transformers: Transformers,
    getContextHelpers: GetContextHelpers,
    log: Log
  ): Step<ExtractDataResult, TransformFilesResult> =>
  async ({asset, page, post}) => {
    const contextData: ContextData = { page, post };
    const contextHelpers = getContextHelpers(contextData);

    const context = (current: Something): Context => ({ current, ...contextData, ...contextHelpers });

    const results = await Promise.allSettled([...asset, ...post, ...page].map(async s => {
      const {location, content} = transformers[s.category];

      return location(s.file).with({ content: content(context(s)) });
    }));

    const buildFiles = results.filter(isFulfilled).map((r) => r.value);

    log(
      "Failures:",
      results.filter(isRejected).map((r) => r.reason)
    );

    return { buildFiles };
  };

export { transformFiles };
