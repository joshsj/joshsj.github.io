import { SomethingCategory, SomethingFor } from "@domain";
import { render } from "pug";
import { Transformer, GetTransformer } from "./types";

const transformers: { [K in SomethingCategory]: Transformer<K> } = {
  asset: async ({ file }) => file.with({ segments: file.segments.slice(1) }),

  page: async (something) =>
    something.file.with({
      // Place in root
      segments: [],
      content: pug(something),
      extension: ".html",
    }),

  post: async (something) =>
    something.file.with({
      // Place in posts folder
      segments: ["blog", ...something.file.segments.slice(1)],
      // Render with pug
      content: pug(something),
      extension: ".html",
    }),
};

const getTransformer: GetTransformer = (category) => transformers[category];

const pug = <T extends SomethingCategory>(something: SomethingFor<T>) =>
  render(something.file.content, {
    filename: something.file.name,
    ...("data" in something ? something.data : {}),
  });

export { getTransformer };
