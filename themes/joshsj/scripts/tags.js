hexo.extend.tag.register(
  "my_email",
  () => `<span class="my-email">(Javascript required)</span>`
);

hexo.extend.tag.register(
  "repo",
  (args) =>
    `<a href="https://github.com/joshsj/${args[0]}">${args[1] || "Source"}</a>`
);
