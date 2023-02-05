import { Log } from "@application/logging";
import { Transformers } from "@application/transformation";
import { Asset, Page, Post, Something } from "@domain";
import { Step } from "@lib/pipeline";
import { dateComparer, isFulfilled, isRejected } from "@lib/utils";
import { ExtractDataResult, TransformFilesResult } from "@application/steps";
import { GetRenderHelpers } from "@application/context";
import { RenderContext, RenderContextData, SiteContext } from "@application/steps/context";

const transformFiles =
  (
    context: SiteContext,
    transformers: Transformers,
    getHelpers: GetRenderHelpers,
    log: Log
  ): Step<ExtractDataResult, TransformFilesResult> =>
  async () => {
    const helpers = getHelpers(context);
    const renderContextData = getRenderContext(context);

    const toRenderContext = (current: Something): RenderContext => ({ current, ...renderContextData, ...helpers });

    const results = await Promise.allSettled(
      context.map(async (s) => {
        const { location, content } = transformers[s.category];
        const renderContext = toRenderContext(s);

        return location(s.file).with({ content: content(renderContext) });
      })
    );

    const buildFiles = results.filter(isFulfilled).map((r) => r.value);

    log(`Successfully transformed ${buildFiles.length}/${context.length} files`);

    log(
      "Failures",
      results.filter(isRejected).map((r) => r.reason)
    );

    return { buildFiles };
  };

const getRenderContext = (context: SiteContext): RenderContextData => {
  const assets = context.filter((x): x is Asset => x.category === "asset");
  const pages = context.filter((x): x is Page => x.category === "page");
  const posts = context
    .filter((x): x is Post => x.category === "post")
    .sort((a, b) => dateComparer(a.created, b.created));

  return { assets, pages, posts };
};

export { transformFiles };
