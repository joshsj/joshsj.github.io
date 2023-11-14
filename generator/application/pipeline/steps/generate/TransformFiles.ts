import { IBuilder, ILocator } from "@application/behaviours/interfaces";
import { ILogger } from "@application/services/interfaces";
import { splitAllSettled } from "@kernel/utilities/native";
import { IStep } from "@kernel/pipeline/interfaces";
import { Resource } from "@models";
import { File } from "@models/io";
import { ExtractDataResult, TransformFilesResult } from "@models/steps/generate";

class TransformFiles implements IStep<ExtractDataResult, TransformFilesResult> {
  constructor(
    private readonly builders: IBuilder[],
    private readonly locators: ILocator[],
    private readonly logger: ILogger
  ) {}

  async execute({ resources }: ExtractDataResult): Promise<TransformFilesResult> {
    const { fulfilled, rejected } = await splitAllSettled(resources.map((f) => this.transform(f)));
    const buildFiles = fulfilled.filter((x): x is File => !!x);

    this.logger.log(`Successfully transformed ${buildFiles.length}/${resources.length} files`);
    this.logger.log("Failures", rejected);

    return { buildFiles };
  }

  private async transform(resource: Resource) {
    const builder = this.builders.find((b) => b.for === resource.name);

    if (!builder) {
      return;
    }

    const locator = this.locators.find((b) => b.for === resource.name);

    if (!locator) {
      throw new Error(`A builder was found for '${resource.name}' but a locator was not.`);
    }

    const located =
      "permalink" in resource && typeof resource.permalink === "string"
        ? File.from(resource.permalink)
        : locator.locate(resource);

    return located.with({ content: await builder.build(resource), encoding: resource.file.encoding });
  }
}

export { TransformFiles };
