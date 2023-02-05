import prism from "prismjs";
// Garbage
require("prismjs/components/index")(["typescript", "python", "csharp"]);

type Lang = "ts" | "cs" | "py" | "tex";
type Options = { inline?: boolean };
type Filter = (s: string, options: Options) => string;

type Filters = { [L in Lang]: Filter };

const highlight =
  (language: string): Filter =>
  (s, options) => {
    const highlighted = `<code class="prism">${prism.highlight(s, prism.languages[language], language)}</code>`;

    return options.inline ? highlighted : `<pre>${highlighted}</pre>`;
  };

// TODO
const filters: Filters = {
  cs: highlight("csharp"),
  py: highlight("python"),
  ts: highlight("typescript"),
  tex: (s) => s,
};

export { filters };
