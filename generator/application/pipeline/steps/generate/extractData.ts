import { ExtractDataResult, Identified, IdentifyFilesResult } from "@models/steps/generate";
import { Log } from "@application/services/types";
import { splitAllSettled } from "@application/utilities/native";
import { Feature } from "@models";
import { IExtractDataStep } from "@application/pipeline/types";
import { IExtractorProvider } from "@application/behaviours/types";

class ExtractData implements IExtractDataStep {
  constructor(private readonly extractorProvider: IExtractorProvider, private readonly log: Log) {}

  async execute({ files }: IdentifyFilesResult): Promise<ExtractDataResult> {
    const { fulfilled, rejected } = await splitAllSettled(files.map((f) => this.extract(f)));

    this.log(`Extracted data for ${fulfilled.length} files`);
    this.log("Failures", rejected);

    return { features: fulfilled };
  }

  private async extract(identified: Identified): Promise<Feature> {
    return this.extractorProvider.get(identified.name)?.extract(identified.file);
  }
}

export { ExtractData };
