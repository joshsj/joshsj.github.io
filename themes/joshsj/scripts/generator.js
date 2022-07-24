hexo.extend.generator.register("tag_pages", function (site) {
  return site.tags.map((tag) => ({
    path: `tags/${tag.name}.html`,
    layout: "pages/posts",
    data: { title: tag.name, tag },
  }));
});
