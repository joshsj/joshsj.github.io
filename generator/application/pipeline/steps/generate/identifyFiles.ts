import { IdentifyFilesResult, ReadSourceResult } from "@models/steps/generate";
import { IGetFeatureName, Log } from "@application/services/types";
import { splitAllSettled } from "@application/utilities/native";
import { File } from "@models/io";
import { IIdentifyFilesStep } from "@application/pipeline/types";

class IdentifyFiles implements IIdentifyFilesStep {
  constructor(private readonly getFeatureName: IGetFeatureName, private readonly log: Log) {}

  async execute({ sourceFiles }: ReadSourceResult): Promise<IdentifyFilesResult> {
    const { fulfilled, rejected } = await splitAllSettled(sourceFiles.map(this.identify));

    this.log(`Categorised ${fulfilled.length}/${sourceFiles.length} source files`);
    this.log("Failures:", rejected);

    return { files: fulfilled };
  }

  private async identify(file: File) {
    const name = this.getFeatureName.for(file);

    if (!name) {
      throw file.full;
    }

    return { file, name };
  }
}

export { IdentifyFiles };
