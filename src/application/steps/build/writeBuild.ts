import { File, IO } from "@domain/io";
import { Step } from "@lib/pipeline";
import { Config, isFulfilled, isRejected } from "@domain";
import { Log } from "@application/logging";
import { TransformFilesResult, WriteBuildResult } from "@application/steps/types";

const writeBuild =
  (io: IO, log: Log, config: Config): Step<TransformFilesResult, WriteBuildResult> =>
    async ({ buildFiles, context }) => {
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

      return { context };
    };


export { writeBuild };
