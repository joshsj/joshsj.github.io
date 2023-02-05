async function* walk(root: string, options: Options, walked = ""): AsyncGenerator<string> {
  const entries = await readdir(root, options);

  for (const entry of entries) {
    const entryPath = path.join(walked, entry.name);

    if (entry.isDirectory()) {
      yield* walk(path.join(root, entry.name), options, entryPath);
    } else {
      yield entryPath;
    }
  }
}
