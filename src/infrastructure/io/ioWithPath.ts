import { readdir, mkdir, writeFile, readFile } from "fs/promises";
import path from "path";
import { File } from "../../domain";
import { IO } from "../../domain/io";

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

class IOWithPath implements IO {
  async write(file: File, root = "") {
    const dir = path.join(root, file.directory);

    // Ensure destination folder exists
    await mkdir(dir, { recursive: true });

    await writeFile(path.join(dir, file.base), file.contents ?? "");
  }

  async read(file: File, root = "") {
    return await readFile(path.join(root, file.full), "utf-8");
  }

  async *walk(root: string) {
    yield* _walk(root);
  }
}

export { IOWithPath };
