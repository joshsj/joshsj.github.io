import { IIO } from "@application/services/types";
import { File } from "@models/io";
import { mkdir, readFile, readdir, writeFile } from "fs/promises";
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

class IO implements IIO {
  async write(file: File, root = "") {
    const dir = path.join(root, file.dir.full);

    // Ensure destination folder exists
    await mkdir(dir, { recursive: true });

    await writeFile(path.join(dir, file.name.full), file.content ?? "", { encoding: file.encoding });
  }

  async read(file: File, root = "") {
    return await readFile(path.join(root, file.full), file.encoding);
  }

  async *walk(root: string) {
    yield* _walk(root);
  }

  cwd() {
    return process.cwd();
  }
}

export { IO };
