import { Context, ContextData, GetContextHelpers } from "@application/context";
import { Log } from "@application/logging";
import { Transformers } from "@application/transformation";
import { Something, SomethingCategory, SomethingFor } from "@domain";
import { Step } from "@lib/pipeline";
import { isFulfilled, isRejected } from "@lib/utils";
import { ExtractDataResult, TransformFilesResult } from "./types";

type ToContext = (current: Something) => Context;

const transformFiles =
  (
    transformers: Transformers,
    getContextHelpers: GetContextHelpers,
    log: Log
  ): Step<ExtractDataResult, TransformFilesResult> =>
  async (somethings) => {
    // First pass
    const { asset, post, page } = assignBuildPaths(somethings, transformers);

    // Construct context
    const contextData: ContextData = { page, post };
    const contextHelpers = getContextHelpers(contextData);
    const toContext: ToContext = (current) => ({ current, ...contextData, ...contextHelpers });

    // Second pass
    const results = await renderContent([...asset, ...post, ...page], transformers, toContext);

    const buildFiles = results.filter(isFulfilled).map((r) => r.value);

    log(
      "Failures:",
      results.filter(isRejected).map((r) => r.reason)
    );

    return { buildFiles };
  };

// TODO guess
const assignBuildPaths = ({ asset, page, post }: ExtractDataResult, transformers: Transformers): ExtractDataResult => {
  const assign = <T extends SomethingCategory>(items: SomethingFor<T>[]): SomethingFor<T>[] =>
    items.map((p) => ({ ...p, file: transformers[p.category].location(p.file) }));

  return {
    asset: assign(asset),
    page: assign(page),
    post: assign(post),
  };
};

const renderContent = async (somethings: Something[], transformers: Transformers, toContext: ToContext) =>
  await Promise.allSettled(
    somethings.map(async (s) => s.file.with({ content: transformers[s.category].content(toContext(s)) }))
  );

export { transformFiles };
