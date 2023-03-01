// Rendering to a mixin
hexo.extend.tag.register("spotify", ([link]) => `\n+spotify("${link}")`);

// Rendering to Pug filter
hexo.extend.tag.register("tex", (args) => `#[:tex(inline) ${args.join(" ")}]`);