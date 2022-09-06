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

hexo.extend.tag.register(
  "caption",
  async ([caption, source], content) => {
    content = await md(content);
    caption = await md(caption);

    return `
      <figure>
        <div class="overflow">${content}</div>

        <figcaption>
          ${source ? `<a href="${source}" class="source">Source</a>` : ""}
          ${caption}
        </figcaption>
      </figure>`;
  },
  { ends: true, async: true }
);

hexo.extend.tag.register(
  "caption_img",
  async ([src, caption, source]) => `
  <figure>
    <a href="${src}" class="hide"><img src="${src}" alt="${caption}"></a>
    
    <figcaption>
      ${source ? `<a href="${source}" class="source">Source</a>` : ""}
      ${await md(caption)}
    </figcaption>
  </figure>`,
  { async: true }
);

hexo.extend.tag.unregister("quote");
hexo.extend.tag.register(
  "quote",
  async ([citation, source], quote) => {
    quote = await md(quote.trim());

    return `
      <figure>
        <blockquote>${quote}</blockquote>

        <figcaption>
          ${source ? `<a href="${source}" class="source">Source</a>` : ""}
          <cite>${citation}</cite>
        </figcaption>
      </figure>`;
  },
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
