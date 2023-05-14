import { Collection, CollectionData } from "@models";
import yaml from "js-yaml";
import { IExtractor } from "@application/behaviours/types";
import { File } from "@models/io";
import { IRenderer } from "@application/services/types";

class CollectionExtractor implements IExtractor<Collection> {
  constructor(private readonly pug: IRenderer<"pug">) {}

  async extract(file: File): Promise<Collection> {
    const data = yaml.load(file.content) as CollectionData;

    data.description = await this.pug.render(file.with({ content: data.description }));

    return { name: "collection", file, ...data };
  }
}
export { CollectionExtractor };
