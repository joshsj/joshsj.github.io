import { File, IO } from "@domain/io";
import { Step } from "@lib/pipeline";
import { Config } from "@domain";
import { Log } from "@application/logging";
import { TransformFilesResult } from "@application/steps/types";
import { isFulfilled, isRejected } from "@lib";

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
