import { ExtractDataResult, TransformFilesResult } from "@models/steps/generate";
import { Log } from "@application/services/types";
import { splitAllSettled } from "@application/utilities/native";
import { Feature } from "@models";
import { File } from "@models/io";
import { ITransformFilesStep } from "@application/pipeline/types";
import { IBuilderProvider, ILocatorProvider } from "@application/behaviours/types";

class TransformFiles implements ITransformFilesStep {
  constructor(
    private readonly locatorProvider: ILocatorProvider,
    private readonly builderProvider: IBuilderProvider,
    private readonly log: Log
  ) {}

  async execute({ features }: ExtractDataResult): Promise<TransformFilesResult> {
    const { fulfilled, rejected } = await splitAllSettled(features.map(f => this.transform(f)));
    const buildFiles = fulfilled.filter((x): x is File => !!x);

    this.log(`Successfully transformed ${buildFiles.length}/${features.length} files`);
    this.log("Failures", rejected);

    return { buildFiles };
  }

  private async transform(feature: Feature) {
    const locator = this.locatorProvider.get(feature.name);
    const builder = this.builderProvider.get(feature.name);

    if (!(locator && builder)) {
      return undefined;
    }

    const located =
      "permalink" in feature && typeof feature.permalink === "string"
        ? File.from(feature.permalink)
        : locator.locate(feature);

    return located.with({ content: await builder.build(feature), encoding: feature.file.encoding });
  }
}

export { TransformFiles };
