import { Config } from "./config";
import { mkdir, readFile, writeFile } from "fs/promises";
import path, { ParsedPath } from "path";
import { fromGenerator, walk } from "./utils";

// TODO look for async version
import pug from "pug";

const processFiles = async (config: Config) => {
  const paths = await fromGenerator(
    walk(config.sourceDir, { withFileTypes: true })
  );

  console.log("Paths");
  console.log(paths);

  const result = await Promise.allSettled(
    paths.map((p) => processFile(p, config))
  );

  const statuses = {
    succeeded: result.filter((x) => x.status === "fulfilled").length,
    failed: result.filter((x) => x.status === "rejected").length,
  };

  console.log("Statuses");
  console.log(statuses);
};

const processFile = async (p: string, config: Config) => {
  const parsed = path.parse(p);

  if (parsed.ext === ".pug") {
    return await processPug(parsed, config);
  }

  return await processStatic(parsed, config);
};

const processPug = async (p: ParsedPath, config: Config) => {
  const source = path.join(config.sourceDir, p.dir, p.base);
  const dest = path.join(config.buildDir, p.dir, p.name + ".html");

  await mkdir(path.join(config.buildDir, p.dir), { recursive: true });

  const contents = await readFile(source, "utf-8");
  const rendered = pug.render(contents);

  return await writeFile(dest, rendered);
};

const processStatic = async (p: ParsedPath, config: Config) => {
  const source = path.join(config.sourceDir, p.dir, p.base);
  const dest = path.join(config.buildDir, p.dir, p.base);

  await mkdir(path.join(config.buildDir, p.dir), { recursive: true });

  const contents = await readFile(source, "utf-8");

  return await writeFile(dest, contents);
};

export { processFiles };
