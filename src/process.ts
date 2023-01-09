import { Config } from "./config";
import { readFile, writeFile, readdir, mkdir } from "fs/promises";
import path from "path";
// TODO look for async version
import { render } from "pug";

const processFiles = async (config: Config) => {
  const paths = await readdir(config.contentDir);

  try {
    await mkdir(config.buildDir, {});
  } catch (e) {
    // Doesn't matter if it exists
  }

  await Promise.allSettled(
    paths.map((p) => processFile(path.join(config.contentDir, p), config))
  );
};

const processFile = async (sourcePath: string, config: Config) => {
  const destPath = path.join(
    config.buildDir,
    path.parse(sourcePath).name + ".html"
  );

  const contents = await readFile(sourcePath, "utf-8");
  const rendered = render(contents);

  return await writeFile(destPath, rendered);
};

export { processFiles };
