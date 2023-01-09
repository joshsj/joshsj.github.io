import { Config } from "./config";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { fromGenerator, walk } from "./utils";

// TODO look for async version
import { render } from "pug";

const processFiles = async (config: Config) => {
  const paths = await fromGenerator(
    walk(config.sourceDir, { withFileTypes: true })
  );

  await Promise.allSettled(paths.map((p) => processFile(p, config)));
};

const processFile = async (p: string, config: Config) => {
  const { parsed, source, dest } = getPaths(p, config);

  await mkdir(path.join(config.buildDir, parsed.dir), { recursive: true });

  const contents = await readFile(source, "utf-8");
  const rendered = render(contents);

  return await writeFile(dest, rendered);
};

const getPaths = (p: string, config: Config) => {
  const parsed = path.parse(p);
  const source = path.join(config.sourceDir, p);
  const dest = path.join(config.buildDir, parsed.dir, parsed.name + ".html");

  return { parsed, source, dest };
};

export { processFiles };
