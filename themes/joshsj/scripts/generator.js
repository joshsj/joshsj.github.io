hexo.extend.generator.register("tag_pages", function (site) {
  const f = hexo.extend.helper.get("format_url");

  return site.tags.map((tag) => ({
    path: `tags/${f(tag.name)}.html`,
    layout: "pages/tag",
    data: { tag, title: tag.name },
  }));
});

hexo.extend.generator.register("collection_pages", function (site) {
  const f = hexo.extend.helper.get("format_url");

  return site.data.collections.map((collection) => {
    const urlTitle = f(collection.title);

    return {
      path: `collections/${urlTitle}.html`,
      layout: "pages/collection",
      data: {
        collection,
        title: collection.title,
        // TODO make sure warehouse can't sort by nested properties
        posts: site.posts.filter((p) => p.path.includes(urlTitle)),
      },
    };
  });
});
