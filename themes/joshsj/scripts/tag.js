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

hexo.extend.tag.register(
  "caption",
  async ([caption, source], content) => `
  <figure>
    ${content}
    <figcaption>
      ${source ? `<a href="${source}" class="source">Source</a>` : ""}
      ${await hexo.render.render({ text: caption, engine: "md" })}
    </figcaption>
  </figure>`,
  { ends: true, async: true }
);

hexo.extend.tag.register(
  "caption_img",
  async ([src, caption, source]) => `
  <figure>
    <a href="${src}" class="hide"><img src="${src}" alt="${caption}"></a>
    
    <figcaption>
      ${source ? `<a href="${source}" class="source">Source</a>` : ""}
      ${await hexo.render.render({ text: caption, engine: "md" })}
    </figcaption>
  </figure>`,
  { async: true }
);

hexo.extend.tag.unregister("quote");
hexo.extend.tag.register(
  "quote",
  async ([citation, source], quote) =>
    `
  <figure>
    <blockquote><p>${quote.trim()}</p></blockquote>

    <figcaption>
      ${source ? `<a href="${source}" class="source">Source</a>` : ""}
      <cite>${await hexo.render.render({ text: citation, engine: "md" })}</cite>
    </figcaption>
  </figure>`,
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
