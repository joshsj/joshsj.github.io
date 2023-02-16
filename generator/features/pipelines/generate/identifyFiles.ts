import { NameFor } from "@common/identification/nameFor";
import { Log } from "@common/logging";
import { Step } from "@common/pipeline";
import { isFulfilled, isRejected } from "@common/utilities/native";
import { Feature } from "@models";
import { ReadSourceResult } from "./readSource";

type Identified = Pick<Feature, "file" | "name">;
type IdentifyFilesResult = { files: Identified[] };

const identifyFiles =
  (nameFor: NameFor, log: Log): Step<ReadSourceResult, IdentifyFilesResult> =>
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

export { Identified, IdentifyFilesResult, identifyFiles };
