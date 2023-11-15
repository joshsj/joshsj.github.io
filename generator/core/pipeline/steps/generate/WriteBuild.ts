import { ILogger } from "@core/services/interfaces";
import { IIO } from "@core/services/interfaces/IO";
import { splitAllSettled } from "@kernel/utilities/native";
import { IStep } from "@kernel/pipeline/interfaces";
import { Config } from "@core/models/config";
import { File } from "@core/models/io";
import { TransformFilesResult } from "@core/models/steps/generate";

class WriteBuild implements IStep<TransformFilesResult, void> {
  constructor(private readonly io: IIO, private readonly logger: ILogger, private readonly config: Config) {}

  async execute({ buildFiles }: TransformFilesResult): Promise<void> {
    const { fulfilled, rejected } = await splitAllSettled(buildFiles.map((f) => this.writeFile(f)));

    this.logger.log(`Successfully wrote ${fulfilled.length}/${buildFiles.length} build files`);
    this.logger.log("Failures", rejected);
  }

  private async writeFile(file: File) {
    await this.io.write(file, this.config.buildDir);

    this.logger.log("Wrote " + file.full);
  }
}

export { WriteBuild };
