import { Config, SomethingCategory, SomethingFor } from "@domain";
import { render } from "pug";
import { Transformer, GetTransformer } from "./types";

const transformers: { [K in SomethingCategory]: Transformer<K> } = {
  asset: async ({ file }) => file.with({ segments: file.segments.slice(1) }),

  page: async (something, config) =>
    something.file.with({
      // Place in root
      segments: [],
      content: pug(something, config),
      extension: ".html",
    }),

  post: async (something, config) =>
    something.file.with({
      // Place in posts folder
      segments: ["blog", ...something.file.segments.slice(1)],
      // Render with pug
      content: pug(something, config),
      extension: ".html",
    }),
};

const getTransformer: GetTransformer = (category) => transformers[category];

const pug = <T extends SomethingCategory>(something: SomethingFor<T>, { sourceDir }: Config) =>
  render(something.file.content, {
    filename: something.file.name,
    basedir: sourceDir,
    ...("data" in something ? something.data : {}),
  });

export { getTransformer };
