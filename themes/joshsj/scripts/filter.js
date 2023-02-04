const fs = require("fs-extra");
const path = require("path");
const yaml = require("yaml");
const xhtml2Pug = require("xhtml2pug");

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

let logged = false;

const htmlPaths = [];

hexo.extend.filter.register("after_post_render", function (data) {
  if (!logged) {
    logged = true;
  }

  const {
    title,
    date,
    updated,
    tags,
    published,
    content: html,
    path: p,
  } = data;

  // Ignore pages
  if (p.endsWith(".html")) {
    return data;
  }

  const frontmatter = yaml
    .stringify({
      title,
      created: date,
      updated,
      tags: tags.map((t) => t.name),
      draft: published ? undefined : true,
    })
    .slice(0, -1); // Trim trailing newline

  const pug = xhtml2Pug
    .convert(html, {
      bodyLess: true,
      attrComma: true,
      encode: false,
      classesAtEnd: true,
    })
    .split("\n")
    .map((s) => {
      s = s
        .replace("| +", "+") // Fix mixins converted to whitespace
        .replace("| capinclude", "  include")
        .replace("| capimg", "  img")
        .replace("---", "&mdash;"); // Fix m dashes

      // Add indent for layout block
      return "  " + s;
    })
    .join("\n");

  const content = [
    "---",
    frontmatter,
    "---",
    "",
    "extends /layouts/default.pug",
    "",
    "block content",
    "",
    pug,
  ].join("\n");

  const dir = path.join("public", p);

  // Ensure directory
  fs.mkdirSync(dir, { recursive: true });

  // Write build file
  fs.writeFileSync(path.join(dir, ".pug"), content);

  // Save for deletion
  htmlPaths.push(path.join(dir, "index.html"));

  return data;
});

hexo.extend.filter.register("before_exit", function () {
  htmlPaths.forEach((p) => fs.rmSync(p));
});
