import { TransformFilesResult } from "@models/steps/generate";
import { ILogger } from "@application/services/types";
import { IIO } from "@application/services/types/io";
import { splitAllSettled } from "@application/utilities/native";
import { Config } from "@models/config";
import { File } from "@models/io";
import { IWriteBuildStep } from "@application/pipeline/types";

class WriteBuild implements IWriteBuildStep {
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
