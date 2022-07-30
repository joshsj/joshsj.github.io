// default isn't working
hexo.extend.helper.register("is_home", function () {
  return this.page.title === "Home";
});

hexo.extend.helper.register("format_url", (obj) =>
  String(obj).toLowerCase().replace(/ /g, "-")
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
