import { IO } from "@common/io";
import { readdir, mkdir, writeFile, readFile } from "fs/promises";
import path from "path";

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

const io: IO = {
  async write(file, root = "") {
    const dir = path.join(root, file.directory);

    // Ensure destination folder exists
    await mkdir(dir, { recursive: true });

    await writeFile(path.join(dir, file.base), file.content ?? "", { encoding: file.encoding });
  },

  async read(file, encoding, root = "") {
    return await readFile(path.join(root, file.full), encoding);
  },

  async *walk(root: string) {
    yield* _walk(root);
  },
};

export { io };
