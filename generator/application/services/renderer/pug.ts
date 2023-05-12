import { IFeatureStore } from "@application/stores/types";
import { Config, Feature } from "@models";
import katex from "katex";
import path from "path";
import prism from "prismjs";
import { render } from "pug";
import { IRenderer } from "../types/renderer";
import { IGetUrl } from "../types";

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
  tex: (s, { inline }) =>
    katex.renderToString(s, {
      displayMode: inline === undefined,
      throwOnError: true,
      strict: false,
    }),
};

// TODO move to interface or somethin
class PugRenderer implements IRenderer<"pug"> {
  readonly of = "pug";

  constructor(
    private readonly store: IFeatureStore,
    private readonly getUrl: IGetUrl,
    private readonly config: Config
  ) {}

  async render(current: Feature): Promise<string> {
    const data = current.file.content;
    const filename = path.join(this.config.sourceDir, current.file.full);

    return render(data, {
      basedir: this.config.sourceDir,
      filename,
      filters,
      store: this.store,
      getUrl: this.getUrl,
      current: current ?? {},
    });
  }
}

export { PugRenderer };
