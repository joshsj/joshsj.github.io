import { IExtractor } from "@application/behaviours/interfaces";
import { ILogger } from "@application/services/interfaces";
import { splitAllSettled } from "@kernel/utilities/native";
import { IStep } from "@kernel/pipeline/interfaces";
import { Entity } from "@models";
import { ExtractDataResult, Identified, IdentifyFilesResult } from "@models/steps/generate";

class ExtractData implements IStep<IdentifyFilesResult, ExtractDataResult> {
  constructor(private readonly extractors: IExtractor[], private readonly logger: ILogger) {}

  async execute({ files }: IdentifyFilesResult): Promise<ExtractDataResult> {
    const { fulfilled, rejected } = await splitAllSettled(files.map((f) => this.extract(f)));

    this.logger.log(`Extracted data for ${fulfilled.length} files`);
    this.logger.log("Failures", rejected);

    return { entitys: fulfilled };
  }

  private async extract(identified: Identified): Promise<Entity> {
    const extractor = this.extractors.find((x) => x.for === identified.name);

    if (!extractor) {
      throw new Error(`An extractor for '${identified.name}' was not provided`);
    }

    return extractor.extract(identified);
  }
}

export { ExtractData };
