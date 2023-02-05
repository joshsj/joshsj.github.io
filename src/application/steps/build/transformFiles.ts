import { Log } from "@application/logging";
import { TransformFilesResult, UpdateSiteContextResult } from "@application/steps";
import { SiteContext } from "@application/steps/context";
import { Builders, Locators } from "@application/transformation";
import { File } from "@domain/io";
import { Step } from "@lib/pipeline";
import { isFulfilled, isRejected } from "@lib/utils";

const transformFiles =
  (
    siteContext: SiteContext,
    locators: Locators,
    builders: Builders,
    log: Log
  ): Step<UpdateSiteContextResult, TransformFilesResult> =>
  async () => {
    const results = await Promise.allSettled(
      siteContext.map(async (x) => {
        const locator = locators[x.category];
        const builder = builders[x.category];

        if (!(locator && builder)) {
          return undefined;
        }

        return locator(x.file).with({ content: await builder(x) });
      })
    );

    const buildFiles = results
      .filter(isFulfilled)
      .map((r) => r.value)
      .filter((x): x is File => !!x);

    log(`Successfully transformed ${buildFiles.length}/${siteContext.length} files`);

    log(
      "Failures",
      results.filter(isRejected).map((r) => r.reason)
    );

    return { buildFiles };
  };

export { transformFiles };
