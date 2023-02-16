import { Renderers } from "@common/rendering";
import { Extractor } from "@common/extraction/extractor";
import { CollectionData } from "@models";
import { load } from "js-yaml";

const makeCollectionExtractor =
  ({ pug }: Renderers): Extractor =>
  async (file) => {
    const { title, description } = load(file.content) as CollectionData;

    const data: CollectionData = { title, description: await pug(description) };

    return { content: file.content, data };
  };

export { makeCollectionExtractor };
