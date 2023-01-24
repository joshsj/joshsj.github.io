import { Context } from "@application/steps";
import { Config } from "@domain";
import { render } from "pug";
import { Transformers } from "./types";

const transformers: Transformers = {
  asset: async ({ current: { file } }) => file.with({ segments: file.segments.slice(1) }),

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
      segments: ["blog", ...context.current.file.segments.slice(1)],
      // Render with pug
      content: pug(context, config),
      extension: ".html",
    }),
};

const pug = (context: Context, { sourceDir }: Config) =>
  render(context.current.file.content, {
    filename: context.current.file.name,
    basedir: sourceDir,
    ...context,
  });

export { transformers };
