// default isn't working
hexo.extend.helper.register("is_home", function () {
  return this.page.title === "Home";
});
