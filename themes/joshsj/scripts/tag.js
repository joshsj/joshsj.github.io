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

// alt isn't required when captioned
hexo.extend.tag.register(
  "caption",
  ([caption], content) =>
    `
  <figure>
    ${content}
    <figcaption>${caption}</figcaption>
  </figure>`,
  { ends: true }
);

// alt isn't required when captioned
hexo.extend.tag.register(
  "caption_img",
  ([src, caption, source]) =>
    `
  <figure>
    <a href="${src}" class="hide"><img src="${src}" alt=""></a>
    
    <figcaption>
      ${source ? `<a href="${source}" class="source">Source</a>` : ""}
      ${caption}
    </figcaption>
  </figure>`
);

hexo.extend.tag.register(
  "spotify",
  ([link]) =>
    ` <iframe class="spotify space" src="https://open.spotify.com/embed/${link}"></iframe>`
);

const math = (args, format = "args") =>
  katex.renderToString(format.replace("args", args.join(" ")));

hexo.extend.tag.register("math", (args) => math(args));
hexo.extend.tag.register("bigo", (args) => math(args, "\\mathcal{O}(args)"));
