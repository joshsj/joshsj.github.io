import { ExtractDataResult, SiteContext } from "@application/steps";
import { Step } from "@lib/pipeline";

const updateContext =
  (context: SiteContext): Step<ExtractDataResult, ExtractDataResult> =>
  async ({ somethings }) => {
    for (const something of somethings) {
      const index = context.findIndex((x) => x.file.full === something.file.full);

      if (index > -1) {
        context[index] = something;
      } else {
        context.push(something);
      }
    }

    return { somethings };
  };

export { updateContext };
