import { IdentifyFilesResult, ReadSourceResult } from "@models/steps/generate";
import { IGetEntityName, ILogger } from "@application/services/types";
import { splitAllSettled } from "@application/utilities/native";
import { File } from "@models/io";
import { IIdentifyFilesStep } from "@application/pipeline/types";

class IdentifyFiles implements IIdentifyFilesStep {
  constructor(private readonly getEntityName: IGetEntityName, private readonly logger: ILogger) {}

  async execute({ sourceFiles }: ReadSourceResult): Promise<IdentifyFilesResult> {
    const { fulfilled, rejected } = await splitAllSettled(sourceFiles.map((p) => this.identify(p)));

    this.logger.log(`Categorised ${fulfilled.length}/${sourceFiles.length} source files`);
    this.logger.log("Failures:", rejected);

    return { files: fulfilled };
  }

  private async identify(file: File) {
    const name = this.getEntityName.for(file);

    if (!name) {
      throw file.full;
    }

    return { file, name };
  }
}

export { IdentifyFiles };
