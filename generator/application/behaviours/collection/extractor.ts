import { IExtractor } from "@application/behaviours/interfaces";
import { PugRenderer } from "@application/services/renderer/PugRenderer";
import { Collection, CollectionData } from "@models";
import { IdentifiedFor } from "@models/steps";
import yaml from "js-yaml";

class CollectionExtractor implements IExtractor<"collection"> {
  readonly for = "collection";

  constructor(private readonly pug: PugRenderer) {}

  async extract({ file }: IdentifiedFor<"collection">): Promise<Collection> {
    const data = yaml.load(file.content) as CollectionData;

    data.description = await this.pug.render(file.with({ content: data.description }));

    return { name: "collection", file, ...data };
  }
}
export { CollectionExtractor };
