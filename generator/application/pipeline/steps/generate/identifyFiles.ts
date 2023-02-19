import { IdentifyFilesStep } from "@application/pipeline/types/steps/generate";
import { FeatureNameFor, Log } from "@application/services/types";
import { splitAllSettled } from "@application/utilities/native";
import { File } from "@models/io";

const identifyFiles =
  (nameFor: FeatureNameFor, log: Log): IdentifyFilesStep =>
  async ({ sourceFiles }) => {
    const identify = async (file: File) => {
      const name = nameFor(file);

      if (!name) {
        throw file.full;
      }

      return { file, name };
    };

    const { fulfilled, rejected } = await splitAllSettled(sourceFiles.map(identify));

    log(`Categorised ${fulfilled.length}/${sourceFiles.length} source files`);
    log("Failures:", rejected);

    return { files: fulfilled };
  };

export { identifyFiles };
