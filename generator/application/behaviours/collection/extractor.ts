import { Collection, CollectionData } from "@models";
import yaml from "js-yaml";
import { IExtractor } from "@application/behaviours/types";
import { File } from "@models/io";

class CollectionExtractor implements IExtractor<Collection> {
  async extract(file: File): Promise<Collection> {
    const { title, description } = yaml.load(file.content) as CollectionData;

    return { name: "collection", file, ...{ title, description } };
  }
}
export { CollectionExtractor };
