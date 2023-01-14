import { Config, IO } from "../../../domain";
import { isRejected } from "../../../domain/utils";
import { Step } from "../../../lib";
import { TransformFilesResult } from "./transformFiles";

// TODO more informative
type WriteBuildResult = { failures: number };

class WriteBuildStep implements Step<WriteBuildResult, TransformFilesResult> {
  constructor(private readonly io: IO, private readonly config: Config) {}

  async execute({
    buildFiles,
  }: TransformFilesResult): Promise<WriteBuildResult> {
    const results = await Promise.allSettled(
      buildFiles.map((f) => this.io.write(f, this.config.buildDir))
    );

    const failures = results.filter(isRejected).length;

    return { failures };
  }
}

export { WriteBuildResult, WriteBuildStep };
