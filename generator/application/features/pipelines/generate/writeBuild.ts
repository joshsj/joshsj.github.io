import { TransformFilesResult } from "./transformFiles";
import { IO } from "@application/types/services/io";
import { Log } from "@application/types/services";
import { Step } from "@application/types/pipeline";
import { Config } from "@models/config";
import { File } from "@models/io";
import { isFulfilled, isRejected } from "@application/utilities/native";

const writeBuild =
  (io: IO, log: Log, config: Config): Step<TransformFilesResult, void> =>
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
