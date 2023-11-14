import { IExtractor } from "@application/behaviours/interfaces";
import { IRenderer } from "@application/services/interfaces";
import { Collection, CollectionData } from "@models";
import { IdentifiedFor } from "@models/steps";
import yaml from "js-yaml";

class CollectionExtractor implements IExtractor<"collection"> {
  readonly for = "collection";

  constructor(private readonly pug: IRenderer<"pug">) {}

  async extract({ file }: IdentifiedFor<"collection">): Promise<Collection> {
    const data = yaml.load(file.content) as CollectionData;

    data.description = await this.pug.render(file.with({ content: data.description }));

    return { name: "collection", file, ...data };
  }
}
export { CollectionExtractor };
