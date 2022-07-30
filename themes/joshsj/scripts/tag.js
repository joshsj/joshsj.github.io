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
  ([src, caption, source]) =>
    `
  <figure>
    <img src="${src}" alt=""> 
    <figcaption>
      ${caption}
      ${source ? `<a href="./${source}">Source</a>` : ""}
    </figcaption>
  </figure>`
);

hexo.extend.tag.register("math", (args) =>
  katex.renderToString(args.join(" "))
);
