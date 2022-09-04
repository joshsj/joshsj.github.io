// this/site/locals cannot be consistently bound to helpers 🙁
// so they're stored here

const UrlReplacements = Object.freeze(
  [
    [" ", "-"],
    [":", ""], // file paths can't contain :
    ["C#", "CSharp"],
    [".NET", "DotNet"], // url segment can't start with .
  ].map(([old, _new]) => [RegExp(old, "g"), _new])
);

hexo.extend.helper.register("format_url", (obj) =>
  UrlReplacements.reduce(
    (url, [exp, repl]) => url.replace(exp, repl),
    String(obj)
  ).toLowerCase()
);

// default isn't working
hexo.extend.helper.register("is_home", function () {
  return this.page.title === "Home";
});

// very quick, not very robust long-term 🤷‍♂️
const inCollection = (post, urlTitle) => {
  const inAny = post.path.split("/").length === 6;
  const inSpecified = urlTitle ? post.path.includes(urlTitle) : true;

  return inAny && inSpecified;
};

hexo.extend.helper.register("in_collection", inCollection);

hexo.extend.helper.register("get_collection", function (post) {
  if (!inCollection(post)) {
    return;
  }

  const urlTitle = post.path.split("/")[3];

  return this.site.data.collections.find(
    (c) => this.format_url(c.title) === urlTitle
  );
});

hexo.extend.helper.register(
  "plural",
  (s, condition, replacement = { add: "s" }) => {
    s = String(s);

    return condition
      ? "add" in replacement
        ? s + replacement.add
        : replacement.becomes
      : s;
  }
);

hexo.extend.helper.register("capitalize", (s) => {
  s = String(s);

  return s[0].toUpperCase() + s.slice(1);
});

hexo.extend.helper.register(
  "markdown_trim",
  // remove root tag and \n
  (text, tag = "p") => {
    const html = hexo.render.renderSync({ text, engine: "md" });
    tag = `<${tag}>`;

    return html.startsWith(tag)
      ? html.slice(tag.length, -2 - tag.length)
      : html;
  }
);

hexo.extend.helper.register("collection_url_for", function (title) {
  return this.url_for(`collections/${this.format_url(title)}`);
});

hexo.extend.helper.register("utoc", (...args) =>
  hexo.extend.helper
    .get("toc")(...args)
    .replace(/<ol/g, "<ul")
    .replace(/<\/ol/g, "</ul")
);

hexo.extend.helper.register("nav_link", function (title) {
  const { path } = this.site.pages.findOne({ title });

  return title === this.page.title
    ? `<span>${title}</span>`
    : `<a href="${this.url_for(path)}">${title}</a>`;
});
