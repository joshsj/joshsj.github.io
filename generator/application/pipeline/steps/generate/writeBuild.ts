import { TransformFilesResult } from "@models/steps/generate";
import { Log } from "@application/services/types";
import { IO } from "@application/services/types/io";
import { splitAllSettled } from "@application/utilities/native";
import { Config } from "@models/config";
import { File } from "@models/io";
import { IWriteBuildStep } from "@application/pipeline/types";

class WriteBuild implements IWriteBuildStep {
  constructor(private readonly io: IO, private readonly log: Log, private readonly config: Config) {}

  async execute({ buildFiles }: TransformFilesResult): Promise<void> {
    const writeFile = async (file: File) => {
      await this.io.write(file, this.config.buildDir);

      this.log("Wrote " + file.full);
    };

    const { fulfilled, rejected } = await splitAllSettled(buildFiles.map(writeFile));

    this.log(`Successfully wrote ${fulfilled.length}/${buildFiles.length} build files`);
    this.log("Failures", rejected);
  }
}

export { WriteBuild };
