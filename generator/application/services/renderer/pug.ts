import { IEntityStore } from "@application/stores/types";
import { Config, Entity } from "@models";
import katex from "katex";
import path from "path";
import prism from "prismjs";
import { render } from "pug";
import { IRenderer } from "../types/renderer";
import { IGetUrl } from "../types";
import * as formattingHelpers from "@application/utilities/formatting";
import * as comparers from "@application/utilities/comparers";
import { File } from "@models/io";

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

class PugRenderer implements IRenderer<"pug"> {
  readonly of = "pug";

  constructor(
    private readonly store: IEntityStore,
    private readonly getUrl: IGetUrl,
    private readonly config: Config
  ) {}

  async render(toRender: Entity | File): Promise<string> {
    const [file, current] = toRender instanceof File ? [toRender, undefined] : [toRender.file, toRender];
    const filename = path.join(this.config.sourceDir, file.full);

    // TODO remove rename
    // @ts-ignore;
    const urlFor: IGetUrl["for"] = (a, b) => this.getUrl.for(a, b);

    const utilities = {
      ...formattingHelpers,
      ...comparers,
      //  getUrl: this.getUrl,
      urlFor,
    };

    return render(file.content, {
      basedir: this.config.sourceDir,
      store: this.store,
      current,
      filename,
      filters,
      ...utilities,
    });
  }
}

export { PugRenderer };
