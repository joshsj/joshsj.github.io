const fs = require("fs");
const path = require("path");
const yaml = require("yaml");

const ExcerptRegex = (() => {
  const marker = "<!--\\s*excerpt\\s*-->";
  const capture = "(?<excerpt>(.|\\n)+)";

  return new RegExp(marker + capture + marker, "u");
})();

const ValidEndPunctuation = Object.freeze([".", "?", "!"]);

hexo.extend.filter.register("after_post_render", function (data) {
  const capitalize = hexo.extend.helper.get("capitalize");

  const match = ExcerptRegex.exec(data.content);

  if (!match) {
    return;
  }

  const excerpt = match.groups.excerpt.replace(/\n/g, " ").trim();

  if (!excerpt) {
    return;
  }

  data.excerpt = `<p>${capitalize(
    excerpt + (ValidEndPunctuation.some((p) => excerpt.endsWith(p)) ? "" : ".")
  )}</p>`;
});

hexo.extend.filter.register("after_post_render", function (data) {
  const { title, date, updated, tags, path: p } = data;

  if (p.endsWith(".html")) {
    return;
  }

  const dir = path.join("public", p);

  fs.mkdirSync(dir, { recursive: true });

  fs.writeFileSync(
    path.join(dir, "preamble.yaml"),
    yaml.stringify({
      title,
      created: date,
      updated,
      tags: tags.map((t) => t.name),
    })
  );

  return data;
});
