import { IIO } from "@domain/io";
import { Step } from "@lib/link";
import { TransformFilesResult } from "./transformFiles";

const makeWriteBuild =
  (io: IIO): Step<TransformFilesResult, void> =>
  async ({ buildFiles, config }) => {
    await Promise.allSettled(buildFiles.map((f) => io.write(f, config.buildDir)));
  };

export { makeWriteBuild };
