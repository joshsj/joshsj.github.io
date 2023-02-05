import { Log } from "@application/logging";
import { ExtractDataResult, SiteContext, UpdateSiteContextResult } from "@application/steps";
import { file, IO } from "@domain/io";
import { Step } from "@lib/pipeline";

const updateSiteContext =
  (siteContext: SiteContext, io: IO, log: Log): Step<ExtractDataResult, UpdateSiteContextResult> =>
  async ({ somethings }) => {
    // Site
    for (const something of somethings) {
      const index = siteContext.findIndex((x) => x.file.full === something.file.full);

      if (index > -1) {
        siteContext[index] = something;
      } else {
        siteContext.push(something);
      }
    }

    // Log
    const f = file({
      name: "context",
      extension: ".json",
      segments: [],
      content: JSON.stringify(siteContext, undefined, 2),
      encoding: "utf8",
    });

    io.write(f).then(() => log(`Wrote site context to ${f.base}`));
  };

export { updateSiteContext };
