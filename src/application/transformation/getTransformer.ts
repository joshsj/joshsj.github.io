import { Config, SomethingCategory, SomethingFor } from "@domain";
import { render } from "pug";
import { Transformer, GetTransformer } from "./types";
import { Context } from "@application/steps";

const transformers: { [K in SomethingCategory]: Transformer<K> } = {
  asset: async ({ current: { file } }) =>
    file.with({ segments: file.segments.slice(1) }),

  page: async (context, config) =>
    context.current.file.with({
      // Place in root
      segments: [],
      content: pug(context, config),
      extension: ".html",
    }),

  post: async (context, config) =>
    context.current.file.with({
      // Place in posts folder
      segments: [ "blog", ...context.current.file.segments.slice(1) ],
      // Render with pug
      content: pug(context, config),
      extension: ".html",
    }),
};

const getTransformer: GetTransformer = (category) => transformers[category];


const pug = <T extends SomethingCategory>(context: Context, { sourceDir }: Config) =>
  render(context.current.file.content, {
    filename: context.current.file.name,
    basedir: sourceDir,
    ...context
  });

export { getTransformer };
