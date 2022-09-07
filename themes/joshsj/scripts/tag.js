// works in combination with client-side scripts

const katex = require("katex");

hexo.extend.tag.register(
  "my_email",
  () => `<span class="my-email">(Javascript required)</span>`
);

hexo.extend.tag.register(
  "repo",
  ([name, text]) =>
    `<a href="https://github.com/joshsj/${name}">${text || "Source"}</a>`
);

const md = (text) => hexo.render.render({ text, engine: "md" });
const toCaption = (content, caption, source = "") => `
<figure>
  <div class="overflow inner">${content}</div>
  <figcaption>
    ${source ? `<a href="${source}" class="source">Source</a>` : ""}
    ${caption}
  </figcaption>
</figure>`;

hexo.extend.tag.register(
  "caption",
  async ([caption, source], content) =>
    toCaption(await md(content), await md(caption), source),
  { ends: true, async: true }
);

hexo.extend.tag.register(
  "caption_img",
  async ([src, caption, source]) =>
    toCaption(
      `<a href="${src}" class="hide"><img src="${src}" alt="${caption}"></a>`,
      await md(caption),
      source
    ),
  { async: true }
);

hexo.extend.tag.unregister("quote");
hexo.extend.tag.register(
  "quote",
  async ([citation, source], quote) =>
    toCaption(
      `<blockquote>${await md(quote.trim())}</blockquote>`,
      `<cite>${citation}</cite>`,
      source
    ),
  { ends: true, async: true }
);

hexo.extend.tag.register(
  "spotify",
  ([link]) =>
    ` <iframe class="spotify space" src="https://open.spotify.com/embed/${link}"></iframe>`
);

const math = (args, format, opts = {}) =>
  katex.renderToString(format.replace("args", args.join(" ")), opts);

hexo.extend.tag.register("math", (args) => math(args, "args"));

hexo.extend.tag.register("display_math", (args) =>
  math(args, "args", { displayMode: true })
);

hexo.extend.tag.register("bigo", (args) => math(args, "\\mathcal{O}(args)"));
