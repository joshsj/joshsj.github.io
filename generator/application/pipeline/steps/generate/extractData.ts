import { Extractors } from "@application/behaviours/types";
import { Step } from "@application/pipeline/types";
import { Log } from "@application/services/types";
import { isFulfilled, isRejected } from "@application/utilities/native";
import { Feature } from "@models";
import { Identified, IdentifyFilesResult } from "./identifyFiles";

type ExtractDataResult = { features: Feature[] };

const extractData =
  (extractors: Extractors, log: Log): Step<IdentifyFilesResult, ExtractDataResult> =>
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

export { ExtractDataResult, extractData };
