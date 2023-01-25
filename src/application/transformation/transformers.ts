import { Config } from "@domain";
import { render } from "pug";
import { Transformer, Transformers } from "./types";
import { RenderContext } from "@application/steps/context";

const pug = (context: RenderContext, { sourceDir }: Config) =>
  render(context.current.file.content, {
    filename: context.current.file.name,
    basedir: sourceDir,
    ...context,
  });

const asset: Transformer = {
  // Trim one folder
  location: (file) => file.with({ segments: file.segments.slice(1) }),
  content: (context) => context.current.file.content,
};

const page = (config: Config): Transformer => ({
  location: (file) =>
    file.with({
      // Place in root
      segments: [],
      extension: ".html",
    }),
  content: (context) => pug(context, config),
});

const post = (config: Config): Transformer => ({
  location: (file) =>
    file.with({
      // Place in folder
      segments: [ "blog", ...file.segments.slice(1) ],
      extension: ".html",
    }),

  content: (context) => pug(context, config),
});

const transformers = (config: Config): Transformers => ({
  asset,
  post: post(config),
  page: page(config),
});

export { transformers };
