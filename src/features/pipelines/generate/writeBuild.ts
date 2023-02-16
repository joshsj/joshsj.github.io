import { TransformFilesResult } from "./transformFiles";
import { IO } from "@common/io";
import { Log } from "@common/logging";
import { Step } from "@common/pipeline";
import { isFulfilled, isRejected } from "@common/utilities/native";
import { Config } from "@models/config";
import { File } from "@models/io";

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
