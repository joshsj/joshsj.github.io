import { File, IO } from "@domain/io";
import { Step } from "@lib/pipeline";
import { Config, isFulfilled, isRejected } from "@domain";
import { Log } from "@application/logging";
import { TransformFilesResult } from "@application/steps/types";

const writeBuild =
  (io: IO, log: Log, config: Config): Step<TransformFilesResult, void> =>
    async ({ buildFiles }) => {
      const results = await Promise.allSettled(buildFiles.map(async (f) => writeFile(f, io, log, config)));

      log(`Successfully wrote ${results.filter(isFulfilled).length}/${buildFiles.length} build files`);

      log(
        "Failures",
        results.filter(isRejected).map((r) => r.reason)
      );
    };

const writeFile = async (file: File, io: IO, log: Log, config: Config) => {
  await io.write(file, config.buildDir);

  log("Wrote " + file.full);
};

export { writeBuild };
