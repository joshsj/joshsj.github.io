import { Extractors } from "@application/behaviours/types";
import { ExtractDataStep, Identified } from "@application/pipeline/types/steps/generate";
import { Log } from "@application/services/types";
import { isFulfilled, isRejected } from "@application/utilities/native";

const extractData =
  (extractors: Extractors, log: Log): ExtractDataStep =>
  async ({ files }) => {
    const extract = async ({ file, name }: Identified) => {
      const { content, data } = await extractors[name](file);

      return { name, file: file.with({ content }), ...data };
    };

    const results = await Promise.allSettled(files.map(extract));
    const features = results.filter(isFulfilled).map((r) => r.value);

    log(`Extracted data for ${features.length} files`);

    log("Failures", results.filter(isRejected));

    return { features };
  };

export { extractData };
