await generate(); // Initial build

// Watch for changes and send them into the pipeline
watch("**/*", { cwd: config.sourceDir, ignoreInitial: true })
  .on("add", (path) => generate({ sourcePaths: [path] }))
  .on("change", (path) => generate({ sourcePaths: [path] }));