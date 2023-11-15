import { ILogger } from "@core/services/interfaces";
import { IIO } from "@core/services/interfaces/IO";
import { fromGenerator, splitAllSettled } from "@kernel/utilities/native";
import { IStep } from "@kernel/pipeline/interfaces/IStep";
import { Config } from "@core/models/config";
import { File } from "@core/models/io";
import { ReadSourceResult, ReadSourceState } from "@core/models/steps";

class ReadSource implements IStep<ReadSourceState, ReadSourceResult> {
  constructor(private readonly io: IIO, private readonly logger: ILogger, private readonly config: Config) {}

  async execute({ sourcePaths }: ReadSourceState): Promise<ReadSourceResult> {
    sourcePaths =
      sourcePaths && sourcePaths.length ? sourcePaths : await fromGenerator(this.io.walk(this.config.sourceDir));

    const { fulfilled, rejected } = await splitAllSettled(sourcePaths.map((p) => this.readFile(p)));

    this.logger.log(`Successfully read ${fulfilled.length}/${sourcePaths.length} source files`);
    this.logger.log("Failures:", rejected);

    return { sourceFiles: fulfilled };
  }

  private async readFile(path: string) {
    const file = File.from(path);
    const content = await this.io.read(file, this.config.sourceDir);

    this.logger.log(`Read file ${file.full} as ${file.encoding}`);

    return file.with({ content });
  }
}

export { ReadSource };
