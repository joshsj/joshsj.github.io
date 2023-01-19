import { IO } from "@domain/io";
import { Step } from "@lib/pipeline";
import { TransformFilesResult } from "./transformFiles";
import { Config } from "@domain";

const makeWriteBuild =
  (io: IO, config: Config): Step<TransformFilesResult, void> =>
    async ({ buildFiles }) => {
      await Promise.allSettled(buildFiles.map((f) => io.write(f, config.buildDir)));
    };

export { makeWriteBuild };
