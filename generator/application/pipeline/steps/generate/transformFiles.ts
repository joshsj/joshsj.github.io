import { IBuilder, ILocator } from "@application/behaviours/interfaces";
import { ILogger } from "@application/services/interfaces";
import { splitAllSettled } from "@kernel/utilities/native";
import { IStep } from "@kernel/pipeline/interfaces";
import { Entity } from "@models";
import { File } from "@models/io";
import { ExtractDataResult, TransformFilesResult } from "@models/steps/generate";

class TransformFiles implements IStep<ExtractDataResult, TransformFilesResult> {
  constructor(
    private readonly builders: IBuilder[],
    private readonly locators: ILocator[],
    private readonly logger: ILogger
  ) {}

  async execute({ entitys }: ExtractDataResult): Promise<TransformFilesResult> {
    const { fulfilled, rejected } = await splitAllSettled(entitys.map((f) => this.transform(f)));
    const buildFiles = fulfilled.filter((x): x is File => !!x);

    this.logger.log(`Successfully transformed ${buildFiles.length}/${entitys.length} files`);
    this.logger.log("Failures", rejected);

    return { buildFiles };
  }

  private async transform(entity: Entity) {
    const builder = this.builders.find((b) => b.for === entity.name);

    if (!builder) {
      return;
    }

    const locator = this.locators.find((b) => b.for === entity.name);

    if (!locator) {
      throw new Error(`A builder was found for '${entity.name}' but a locator was not.`);
    }

    const located =
      "permalink" in entity && typeof entity.permalink === "string"
        ? File.from(entity.permalink)
        : locator.locate(entity);

    return located.with({ content: await builder.build(entity), encoding: entity.file.encoding });
  }
}

export { TransformFiles };
