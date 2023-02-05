import { Renderers } from "@application/rendering";
import { CollectionData } from "@domain";
import { load } from "js-yaml";
import { frontmatter } from "./frontmatter";
import { Extractor, Extractors } from "./types";

const none: Extractor = async ({ content }) => ({ content, data: {} });

const collection =
  ({ pug }: Renderers): Extractor =>
  async (file) => {
    const { title, description } = load(file.content) as CollectionData;

    const data: CollectionData = { title, description: await pug(description) };

    return { content: file.content, data };
  };

const getExtractors = (renderers: Renderers): Extractors => ({
  asset: none,
  page: frontmatter,
  post: frontmatter,
  postAsset: none,
  collection: collection(renderers),
});

export { getExtractors };
