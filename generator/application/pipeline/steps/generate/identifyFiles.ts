import { IdentifyFilesStep } from "@application/pipeline/types/steps/generate";
import { FeatureNameFor, Log } from "@application/services/types";
import { isFulfilled, isRejected } from "@application/utilities/native";

const identifyFiles =
  (nameFor: FeatureNameFor, log: Log): IdentifyFilesStep =>
  async ({ sourceFiles }) => {
    const results = await Promise.allSettled(
      sourceFiles.map(async (file) => {
        const name = nameFor(file);

        if (!name) {
          throw file.full;
        }

        return { file, name };
      })
    );

    const files = results.filter(isFulfilled).map((r) => r.value);

    log(`Categorised ${files.length}/${sourceFiles.length} source files`);
    log(
      "Failures:",
      results.filter(isRejected).map((r) => r.reason)
    );

    return { files };
  };

export { identifyFiles };
