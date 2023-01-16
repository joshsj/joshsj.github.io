import { IO } from "@domain/io";
import { Step } from "@lib/step";
import { TransformFilesResult } from "./transformFiles";

const makeWriteBuild =
  (io: IO): Step<TransformFilesResult> =>
  (next) =>
  async ({ buildFiles, config }) => {
    await Promise.allSettled(buildFiles.map((f) => io.write(f, config.buildDir)));

    await next?.();
  };

export { makeWriteBuild };
