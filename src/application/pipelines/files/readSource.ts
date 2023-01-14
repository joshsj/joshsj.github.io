import { Config } from "@domain";
import { File, IIO } from "@domain/io";
import { fromGenerator, walk } from "@domain/utils";
import { IStep } from "@lib/pipelineBuilder";

type ReadSourceResult = {
  sourceFiles: File[];
};

class ReadSourceStep implements IStep<ReadSourceResult> {
  constructor(private readonly io: IIO, private readonly config: Config) {}

  async execute(): Promise<ReadSourceResult> {
    const sourceFiles = await fromGenerator(this.readFiles());

    return { sourceFiles };
  }

  private async *readFiles() {
    for await (const p of walk(this.config.sourceDir, {
      withFileTypes: true,
    })) {
      const file = File.from(p);
      const contents = await this.io.read(file, this.config.sourceDir);
      yield File.with(file, { contents });
    }
  }
}

export { ReadSourceResult, ReadSourceStep };
