// works in combination with client-side scripts

const path = require("path");
const fs = require("fs");

const md = (text) => hexo.render.render({ text, engine: "md" });

hexo.extend.tag.register("my_email", () => "#[+myEmail]");

hexo.extend.tag.register("spotify", ([link]) => `\n+spotify("${link}")`);

hexo.extend.tag.register(
  "caption_img",
  ([filename, caption, source]) =>
    `\n+caption("${[filename, caption, source].join('", "')}")`
);

const tex = (args, format, opts = {}) => `#[+tex("${args.join(" ")}")]`;
hexo.extend.tag.register("tex", (args) => tex(args, "args"));
hexo.extend.tag.register("dtex", (args) =>
  tex(args, "args", { displayMode: true })
);
hexo.extend.tag.register("bigo", (args) => tex(args, "\\mathcal{O}(args)"));

const counters = {};
hexo.extend.tag.register(
  "caption",
  async function ([caption, source], content) {
    if (!(this.path in counters)) {
      counters[this.path] = 1;
    }

    const dir = path.join(process.cwd(), "public", this.path);
    const filename = `caption${counters[this.path]}.html`;

    fs.mkdirSync(dir, { recursive: true });

    fs.writeFileSync(path.join(dir, filename), await md(content));

    counters[this.path] += 1;

    return `\n+caption("${filename}", "${caption}", "${source}")`;
  },
  { ends: true, async: true }
);

hexo.extend.tag.unregister("quote");
hexo.extend.tag.register(
  "quote",
  ([citation], quote) => `\n+quote("${quote.trim()}", "${citation}")`,
  { ends: true }
);
