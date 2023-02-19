import { WriteBuildStep } from "@application/pipeline/types/steps/generate";
import { Log } from "@application/services/types";
import { IO } from "@application/services/types/io";
import { splitAllSettled } from "@application/utilities/native";
import { Config } from "@models/config";
import { File } from "@models/io";

const writeBuild =
  (io: IO, log: Log, config: Config): WriteBuildStep =>
  async ({ buildFiles }) => {
    const writeFile = async (file: File) => {
      await io.write(file, config.buildDir);

      log("Wrote " + file.full);
    };

    const { fulfilled, rejected } = await splitAllSettled(buildFiles.map(writeFile));

    log(`Successfully wrote ${fulfilled.length}/${buildFiles.length} build files`);
    log("Failures", rejected);
  };

export { writeBuild };
