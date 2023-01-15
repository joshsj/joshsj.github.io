import { Config } from "@domain";
import { IIO } from "@domain/io";
import { isRejected } from "@domain/utils";
import { IStep } from "@lib/pipelineBuilder";
import { TransformFilesResult } from "../../steps/transformFiles";

// TODO more informative
type WriteBuildResult = { failures: number };

class WriteBuildStep implements IStep<WriteBuildResult, TransformFilesResult> {
  constructor(private readonly io: IIO, private readonly config: Config) {}

  async execute({ buildFiles }: TransformFilesResult): Promise<WriteBuildResult> {
    const results = await Promise.allSettled(buildFiles.map((f) => this.io.write(f, this.config.buildDir)));

    const failures = results.filter(isRejected).length;

    return { failures };
  }
}

export { WriteBuildResult, WriteBuildStep };
