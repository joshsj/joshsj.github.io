import { IExtractor } from "@core/behaviours/interfaces";
import { ILogger } from "@core/services/interfaces";
import { splitAllSettled } from "@kernel/utilities/native";
import { IStep } from "@kernel/pipeline/interfaces";
import { Resource } from "@core/models";
import { ExtractDataResult, Identified, IdentifyFilesResult } from "@core/models/steps/generate";

class ExtractData implements IStep<IdentifyFilesResult, ExtractDataResult> {
  constructor(private readonly extractors: IExtractor[], private readonly logger: ILogger) {}

  async execute({ files }: IdentifyFilesResult): Promise<ExtractDataResult> {
    const { fulfilled, rejected } = await splitAllSettled(files.map((f) => this.extract(f)));

    this.logger.log(`Extracted data for ${fulfilled.length} files`);
    this.logger.log("Failures", rejected);

    return { resources: fulfilled };
  }

  private async extract(identified: Identified): Promise<Resource> {
    const extractor = this.extractors.find((x) => x.for === identified.name);

    if (!extractor) {
      throw new Error(`An extractor for '${identified.name}' was not provided`);
    }

    return extractor.extract(identified);
  }
}

export { ExtractData };
