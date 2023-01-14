import { Config, File, IO } from "../../../domain";
import { fromGenerator, walk } from "../../../domain/utils";
import { Step } from "../../../lib";

type ReadSourceResult = {
  sourceFiles: File[];
};

class ReadSourceStep implements Step<ReadSourceResult> {
  constructor(private readonly io: IO, private readonly config: Config) {}

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
