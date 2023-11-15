import { IExtractor } from "@application/behaviours/interfaces";
import { PugRenderer } from "@application/services/renderer/PugRenderer";
import { Collection, CollectionData } from "@models";
import { Identified } from "@models/steps";
import yaml from "js-yaml";

class CollectionExtractor implements IExtractor<Collection> {
  readonly for = "collection";

  constructor(private readonly pug: PugRenderer) {}

  async extract({ file }: Identified<Collection>): Promise<Collection> {
    const data = yaml.load(file.content) as CollectionData;

    data.description = await this.pug.render(file.with({ content: data.description }));

    return { name: "collection", file, ...data };
  }
}
export { CollectionExtractor };
