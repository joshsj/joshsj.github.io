import { CollectionData } from "@models";
import { load } from "js-yaml";
import { Renderers } from "@application/types/services";
import { Extractor } from "@application/types/behaviours";

const makeCollectionExtractor =
  ({ pug }: Renderers): Extractor =>
  async (file) => {
    const { title, description } = load(file.content) as CollectionData;

    const data: CollectionData = { title, description: await pug(description) };

    return { content: file.content, data };
  };

export { makeCollectionExtractor };
