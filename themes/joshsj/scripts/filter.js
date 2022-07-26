const ExcerptRegex = /<!-- excerpt -->(?<excerpt>(.|\n)+)<!-- excerpt -->/u;

hexo.extend.filter.register("after_post_render", function (data) {
  const match = ExcerptRegex.exec(data.content);

  if (!match) {
    return;
  }

  const excerpt = match.groups.excerpt.replace(/\n/g, " ").trim();

  if (excerpt) {
    data.excerpt = excerpt;
  }
});

// supplement collections data
hexo.extend.filter.register("template_locals", async (locals) => {
  await Promise.allSettled(
    locals.site.data.collections.map(async (s) => {
      s.description = (
        await hexo.render.render({
          text: s.description,
          engine: "md",
        })
      ).slice(3, -5); // remove p tags and \n
    })
  );
});
