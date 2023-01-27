import { Extractors } from "@application/extraction/types";
import { Log } from "@application/logging";
import { isFulfilled, isRejected } from "@domain";
import { Step } from "@lib/pipeline";
import { CategorisedFile, CategoriseFilesResult, ExtractDataResult } from "@application/steps"

const extractData =
  (extractors: Extractors, log: Log): Step<CategoriseFilesResult, ExtractDataResult> =>
  async ({ files, context }) => {
    const extract = async (file: CategorisedFile) => {
      const { content, data } = extractors[file.category](file);

      return { category: file.category, file: file.with({ content }), ...data };
    };

    const results = await Promise.allSettled(files.map(extract));
    const somethings = results.filter(isFulfilled).map((r) => r.value);

    log(`Extracted data for ${somethings.length} files`);

    log("Failures", results.filter(isRejected));

    return { somethings, context };
  };

export { extractData };
