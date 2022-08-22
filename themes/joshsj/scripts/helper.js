// this/site/locals cannot be consistently bound to helpers 🙁
// so they're stored here
const UrlReplacements = Object.freeze({
  "C#": "CSharp",
});

hexo.extend.helper.register("format_url", (obj) => {
  let url = String(obj);

  Object.entries(UrlReplacements).forEach(([old, _new]) => {
    url = url.replace(RegExp(old, "g"), _new);
  });

  return url.replace(/ /g, "-").toLowerCase();
});

// default isn't working
hexo.extend.helper.register("is_home", function () {
  return this.page.title === "Home";
});

// very quick, not very reliable long-term 🤷‍♂️
hexo.extend.helper.register(
  "in_collection",
  (post) => post.path.split("/").length === 6
);

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
