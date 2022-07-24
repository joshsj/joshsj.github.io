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
