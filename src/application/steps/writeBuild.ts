import { IO } from "@domain/io";
import { Step } from "@lib/pipeline";
import { TransformFilesResult } from "./transformFiles";

const makeWriteBuild =
  (io: IO): Step<TransformFilesResult, void> =>
  async ({ buildFiles, config }) => {
    await Promise.allSettled(buildFiles.map((f) => io.write(f, config.buildDir)));
  };

export { makeWriteBuild };
