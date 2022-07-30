const ExcerptRegex = /<!-- excerpt -->(?<excerpt>(.|\n)+)<!-- excerpt -->/u;

hexo.extend.filter.register("after_post_render", function (data) {
  const capitalize = hexo.extend.helper.get("capitalize");

  const match = ExcerptRegex.exec(data.content);

  if (!match) {
    return;
  }

  const excerpt = match.groups.excerpt.replace(/\n/g, " ").trim();

  if (excerpt) {
    data.excerpt = capitalize(excerpt);
  }
});

// supplement series data
hexo.extend.filter.register("template_locals", async (locals) => {
  await Promise.allSettled(
    locals.site.data.series.map(async (s) => {
      const f = hexo.extend.helper.get("format_url");

      s.description = (
        await hexo.render.render({
          text: s.description,
          engine: "md",
        })
      ).slice(3, -5); // remove p tags and \n

      s.path = `series/${f(s.title)}`;
    })
  );
});
