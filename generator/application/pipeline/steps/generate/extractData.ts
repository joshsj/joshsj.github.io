import { Extractors } from "@application/behaviours/types";
import { ExtractDataStep, Identified } from "@application/pipeline/types/steps/generate";
import { Log } from "@application/services/types";
import { splitAllSettled } from "@application/utilities/native";
import { Feature } from "@models";

const extractData =
  (extractors: Extractors, log: Log): ExtractDataStep =>
  async ({ files }) => {
    const extract = async ({ file, name }: Identified): Promise<Feature> => {
      const { content, data } = await extractors[name](file);

      return { name, file: file.with({ content }), ...data };
    };

    const { fulfilled, rejected } = await splitAllSettled(files.map(extract));

    log(`Extracted data for ${fulfilled.length} files`);
    log("Failures", rejected);

    return { features: fulfilled };
  };

export { extractData };
