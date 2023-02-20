import { FeatureStore } from "@application/stores/types";
import { Config, Feature } from "@models";
import katex from "katex";
import path from "path";
import prism from "prismjs";
import { render } from "pug";
import { Renderer, RenderHelpers } from "./types";

// Garbage
require("prismjs/components/index")(["typescript", "python", "csharp", "json"]);

type Lang = "ts" | "cs" | "py" | "json" | "tex";
type Options = { inline?: true };
type Filter = (s: string, options: Options) => string;
type Filters = { [L in Lang]: Filter };

const highlight =
  (language: string): Filter =>
  (s, options) => {
    const highlighted = `<code class="prism">${prism.highlight(s, prism.languages[language], language)}</code>`;

    return options.inline ? highlighted : `<pre>${highlighted}</pre>`;
  };

const filters: Filters = {
  cs: highlight("csharp"),
  py: highlight("python"),
  ts: highlight("typescript"),
  json: highlight("json"),
  tex: (s, { inline }) => katex.renderToString(s, {
    displayMode: inline === undefined,
    throwOnError: true
  }),
};

type Parts = { data: string; filename?: string; current?: Feature };

const getParts = (hmm: Parameters<Renderer>[0], { sourceDir }: Config): Parts => {
  if (typeof hmm === "string") {
    return { data: hmm };
  }

  if ("segments" in hmm) {
    return { data: hmm.content, filename: path.join(sourceDir, hmm.full) };
  }

  return { data: hmm.file.content, filename: path.join(sourceDir, hmm.file.full), current: hmm };
};

const makePugRenderer =
  (store: FeatureStore, helpers: RenderHelpers, config: Config): Renderer =>
  async (hmm) => {
    const { data, current, filename } = getParts(hmm, config);

    return render(data, {
      basedir: config.sourceDir,
      filename,
      filters,
      store,
      ...helpers,
      current: current ?? {},
    });
  };

export { makePugRenderer };
