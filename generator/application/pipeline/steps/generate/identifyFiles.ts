import { IdentifyFilesResult, ReadSourceResult } from "@models/steps/generate";
import { IGetResourceName, ILogger } from "@application/services/interfaces";
import { splitAllSettled } from "@kernel/utilities/native";
import { File } from "@models/io";
import { IStep } from "@kernel/pipeline/interfaces";

class IdentifyFiles implements IStep<ReadSourceResult, IdentifyFilesResult> {
  constructor(private readonly getResourceName: IGetResourceName, private readonly logger: ILogger) {}

  async execute({ sourceFiles }: ReadSourceResult): Promise<IdentifyFilesResult> {
    const { fulfilled, rejected } = await splitAllSettled(sourceFiles.map((p) => this.identify(p)));

    this.logger.log(`Categorised ${fulfilled.length}/${sourceFiles.length} source files`);
    this.logger.log("Failures:", rejected);

    return { files: fulfilled };
  }

  private async identify(file: File) {
    const name = this.getResourceName.for(file);

    if (!name) {
      throw file.full;
    }

    return { file, name };
  }
}

export { IdentifyFiles };
