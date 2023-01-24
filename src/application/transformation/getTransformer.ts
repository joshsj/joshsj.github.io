import { Context } from "@application/steps";
import { Config } from "@domain";
import { render } from "pug";
import { Transformer, Transformers } from "./types";

const pug = (context: Context, { sourceDir }: Config) =>
  render(context.current.file.content, {
    filename: context.current.file.name,
    basedir: sourceDir,
    ...context,
  });

const asset: Transformer = {
  location: (file) => file.with({ segments: file.segments.slice(1) }),
  content: async ({ current }) => current.file.content,
};

const page = (config: Config): Transformer => ({
  location: (file) =>
    file.with({
      // Place in root
      segments: [],
      extension: ".html",
    }),

  content: async (context) => pug(context, config),
});

const post = (config: Config): Transformer => ({
  location: (file) =>
    file.with({
      // Place in posts folder
      segments: ["blog", ...file.segments.slice(1)],
      extension: ".html",
    }),
  content: async (context) => pug(context, config),
});

const transformers = (config: Config): Transformers => ({
  asset,
  post: post(config),
  page: page(config),
});

export { transformers };
