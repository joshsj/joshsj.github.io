import { IExtractor } from "@application/behaviours/types";
import { IExtractDataStep } from "@application/pipeline/types";
import { ILogger } from "@application/services/types";
import { splitAllSettled } from "@application/utilities/native";
import { Entity } from "@models";
import { ExtractDataResult, Identified, IdentifyFilesResult } from "@models/steps/generate";

class ExtractData implements IExtractDataStep {
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
