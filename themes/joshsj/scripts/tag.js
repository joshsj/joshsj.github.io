// works in combination with client-side scripts

const path = require("path");
const fs = require("fs");

const md = (text) => hexo.render.render({ text, engine: "md" });

const toArgs = (args) =>
  args
    .filter((a) => !!a)
    .map((s) => `"${s}"`)
    .join(", ");

hexo.extend.tag.register("my_email", () => "#[+myEmail]");

hexo.extend.tag.register("spotify", ([link]) => `\n+spotify("${link}")`);

// TODO fix
hexo.extend.tag.register(
  "caption_img",
  ([filename, caption, source]) =>
    `\n+caption(${toArgs([caption, source])})\n  capimg(src="${filename}")`
);

hexo.extend.tag.register("tex", (args) => `#[:tex(inline) ${args.join(" ")}]`);

hexo.extend.tag.register("dtex", (args) => `:tex\n  ${args.join(" ")}`);

hexo.extend.tag.register(
  "bigo",
  (args) => `#[:tex(inline) \\mathcal{O}(${args.join(" ")})]`
);

const counters = {};

const languageExtensions = {
  typescript: "ts",
  csharp: "cs",
  python: "py",
};

const getStuff = async (content) => {
  const exp = /```(.+)/;

  const langMatch = exp.exec(content);

  if (!langMatch) {
    return [await md(content), "html"];
  }

  const key = langMatch[1].toLowerCase();

  const extension = languageExtensions[key];

  if (!extension) {
    throw `Unknown extension ${key}`;
  }

  return [content.replace(exp, "").replace("```", "").trim(), extension];
};

hexo.extend.tag.register(
  "caption",
  async function ([caption, source], content) {
    if (!(this.path in counters)) {
      counters[this.path] = 1;
    }

    const [newContent, extension] = await getStuff(content);

    const dir = path.join(process.cwd(), "public", this.path);
    const filename = `caption${counters[this.path]}.${extension}`;

    fs.mkdirSync(dir, { recursive: true });

    fs.writeFileSync(path.join(dir, filename), newContent);

    counters[this.path] += 1;

    return `\n+caption(${toArgs([caption, source])})\n  capinclude${
      extension !== "html" ? ":" + extension : ""
    } ${filename}`;
  },
  { ends: true, async: true }
);

hexo.extend.tag.unregister("quote");
hexo.extend.tag.register(
  "quote",
  ([citation], quote) => `\n+quote("${citation}")\n  ${quote.trim()}`,
  { ends: true }
);
