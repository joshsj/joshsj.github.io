import { Directory } from "./directory";
import { parse, sep } from "path";

class File extends Directory {
  constructor(
    segments: string[],
    sep: string,
    public readonly name: string,
    public readonly extension: string,
    public readonly contents?: string
  ) {
    super(segments, sep);
  }

  get base() {
    return `${this.name}${this.extension}`;
  }

  get full() {
    return [...this.segments, this.base].join(this.sep);
  }

  static with(base: File, patch: Partial<File> = {}) {
    const resolve = <T extends keyof File>(k: T) => patch[k] ?? base[k];

    return new File(
      resolve("segments"),
      resolve("sep"),
      resolve("name"),
      resolve("extension"),
      resolve("contents")
    );
  }

  static from(path: string) {
    const { dir, name, ext } = parse(path);

    return new File(dir.split(sep), sep, name, ext);
  }
}

export { File };
