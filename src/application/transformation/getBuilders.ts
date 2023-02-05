import { Renderers } from "@application/rendering";
import { Builder, Builders } from "./types";

const none: Builder = async (something) => something.file.content;

const getBuilders = ({ pug }: Renderers): Builders => ({
  asset: none,
  collection: undefined,
  page: async (file) => await pug(file),
  post: async (file) => await pug(file),
  postAsset: none,
});

export { getBuilders };
