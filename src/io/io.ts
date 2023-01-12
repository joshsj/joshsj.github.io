import { mkdir, readdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { File, IIO } from ".";
import { Config } from "../configuration";

async function* _walk(root: string, walked = ""): AsyncGenerator<string> {
  const entries = await readdir(root, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(walked, entry.name);

    if (entry.isDirectory()) {
      yield* _walk(path.join(root, entry.name), entryPath);
    } else {
      yield entryPath;
    }
  }
}

class IO implements IIO {
  constructor(private readonly config: Config) {}

  async write(file: File) {
    if (!file.contents) {
      return;
    }

    const dir = path.join(this.config.buildDir, file.directory);

    // Ensure destination folder exists
    await mkdir(dir, { recursive: true });

    await writeFile(path.join(dir, file.base), file.contents);
  }

  async read(file: File) {
    return await readFile(path.join(this.config.sourceDir, file.full), "utf-8");
  }

  async *walk(root: string) {
    yield* _walk(root);
  }
}

export { IO };
