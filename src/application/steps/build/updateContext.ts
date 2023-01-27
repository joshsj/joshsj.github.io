import { ExtractDataResult } from "@application/steps/types";
import { Step } from "@lib/pipeline";

const updateContext : Step<ExtractDataResult, ExtractDataResult> =
    async ({ somethings, context }) => {
      for (const something of somethings) {
        const index = context.findIndex(x => x.file.full === something.file.full);

        if (index > -1) {
          context[index] = something;
        } else {
          context.push(something);
        }
      }

      return { somethings, context }
    }

export { updateContext }