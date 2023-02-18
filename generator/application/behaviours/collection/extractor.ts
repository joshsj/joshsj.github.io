import { CollectionData } from "@models";
import { load } from "js-yaml";
import { Renderers } from "@application/rendering/types";
import { Extractor } from "@application/behaviours/types";

const makeCollectionExtractor =
  ({ pug }: Renderers): Extractor =>
  async (file) => {
    const { title, description } = load(file.content) as CollectionData;

    const data: CollectionData = { title, description: await pug(description) };

    return { content: file.content, data };
  };

export { makeCollectionExtractor };
