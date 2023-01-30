import { Log } from "@application/logging";
import { Transformers } from "@application/transformation";
import { Asset, Page, Post, Something } from "@domain";
import { Step } from "@lib/pipeline";
import { isFulfilled, isRejected } from "@lib/utils";
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
  async ({ somethings }) => {
    const helpers = getHelpers(context);
    const renderContextData: RenderContextData = {
      assets: context.filter((x): x is Asset => x.category === "asset"),
      pages: context.filter((x): x is Page => x.category === "page"),
      posts: context.filter((x): x is Post => x.category === "post"),
    };

    const toRenderContext = (current: Something): RenderContext => ({ current, ...renderContextData, ...helpers });

    const results = await Promise.allSettled(
      somethings.map(async (s) => {
        const { location, content } = transformers[s.category];
        const renderContext = toRenderContext(s);

        return location(s.file).with({ content: content(renderContext) });
      })
    );

    const buildFiles = results.filter(isFulfilled).map((r) => r.value);

    log(`Successfully transformed ${buildFiles.length}/${somethings.length} files`);

    log(
      "Failures",
      results.filter(isRejected).map((r) => r.reason)
    );

    return { buildFiles };
  };

export { transformFiles };
