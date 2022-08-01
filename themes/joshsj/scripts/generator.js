hexo.extend.generator.register("tag_pages", function (site) {
  const f = hexo.extend.helper.get("format_url");

  return site.tags.map((tag) => ({
    path: `tag/${f(tag.name)}.html`,
    layout: "pages/tag",
    data: { title: tag.name, tag },
  }));
});

hexo.extend.generator.register("series_pages", function (site) {
  const f = hexo.extend.helper.get("format_url");

  return site.data.series.map((series) => ({
    path: `series/${f(series.title)}.html`,
    layout: "pages/series",
    data: {
      title: series.title,
      series,
      // TODO make sure warehouse can't sort by nested properties
      posts: site.posts.filter((p) => p.series === series.title),
    },
  }));
});
