import { Config } from "@domain";
import { render } from "pug";
import { Transformer, Transformers } from "./types";
import { RenderContext } from "@application/steps/context";
import path from "path";
import { filters } from "./filters";

const pug = (context: RenderContext, { sourceDir }: Config) =>
  render(context.current.file.content, {
    filename: path.join(sourceDir, context.current.file.full),
    basedir: sourceDir,
    filters,
    ...context,
  });

const asset: Transformer = {
  location: (file) => file.with({ segments: file.segments.slice(1) }),
  content: (context) => context.current.file.content,
};

const page = (config: Config): Transformer => ({
  location: (file) =>
    file.with({
      segments: [],
      extension: ".html",
    }),
  content: (context) => pug(context, config),
});

const post = (config: Config): Transformer => ({
  location: (file) =>
    file.with({
      segments: ["blog", ...file.segments.slice(1)],
      name: "index",
      extension: ".html",
    }),

  content: (context) => pug(context, config),
});

const postAsset: Transformer = {
  location: (file) =>
    file.with({
      segments: ["blog", ...file.segments.slice(1)],
    }),
  content: (context) => context.current.file.content,
};

const transformers = (config: Config): Transformers => ({
  asset,
  post: post(config),
  page: page(config),
  postAsset,
});

export { transformers };
