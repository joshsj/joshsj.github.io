import { WriteBuildStep } from "@application/pipeline/types/steps/generate";
import { Log } from "@application/services/types";
import { IO } from "@application/services/types/io";
import { isFulfilled, isRejected } from "@application/utilities/native";
import { Config } from "@models/config";
import { File } from "@models/io";

const writeBuild =
  (io: IO, log: Log, config: Config): WriteBuildStep =>
  async ({ buildFiles }) => {
    const writeFile = async (file: File) => {
      await io.write(file, config.buildDir);

      log("Wrote " + file.full);
    };

    const results = await Promise.allSettled(buildFiles.map(async (f) => writeFile(f)));

    log(`Successfully wrote ${results.filter(isFulfilled).length}/${buildFiles.length} build files`);

    log(
      "Failures",
      results.filter(isRejected).map((r) => r.reason)
    );
  };

export { writeBuild };
