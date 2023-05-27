import { IBuilder, ILocator } from "@application/behaviours/types";
import { ITransformFilesStep } from "@application/pipeline/types";
import { Log } from "@application/services/types";
import { splitAllSettled } from "@application/utilities/native";
import { Entity } from "@models";
import { File } from "@models/io";
import { ExtractDataResult, TransformFilesResult } from "@models/steps/generate";

class TransformFiles implements ITransformFilesStep {
  constructor(
    private readonly builders: IBuilder[],
    private readonly locators: ILocator[],
    private readonly log: Log
  ) {}

  async execute({ entitys }: ExtractDataResult): Promise<TransformFilesResult> {
    const { fulfilled, rejected } = await splitAllSettled(entitys.map((f) => this.transform(f)));
    const buildFiles = fulfilled.filter((x): x is File => !!x);

    this.log(`Successfully transformed ${buildFiles.length}/${entitys.length} files`);
    this.log("Failures", rejected);

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
