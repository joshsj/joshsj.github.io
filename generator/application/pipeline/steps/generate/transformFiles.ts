import { ExtractDataResult, TransformFilesResult } from "@models/steps/generate";
import { Log } from "@application/services/types";
import { splitAllSettled } from "@application/utilities/native";
import { Entity } from "@models";
import { File } from "@models/io";
import { ITransformFilesStep } from "@application/pipeline/types";
import { IBuilderProvider, ILocatorProvider } from "@application/behaviours/types";

class TransformFiles implements ITransformFilesStep {
  constructor(
    private readonly locatorProvider: ILocatorProvider,
    private readonly builderProvider: IBuilderProvider,
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
    const locator = this.locatorProvider.get(entity.name);
    const builder = this.builderProvider.get(entity.name);

    if (!(locator && builder)) {
      return undefined;
    }

    const located =
      "permalink" in entity && typeof entity.permalink === "string"
        ? File.from(entity.permalink)
        : locator.locate(entity);

    return located.with({ content: await builder.build(entity), encoding: entity.file.encoding });
  }
}

export { TransformFiles };
