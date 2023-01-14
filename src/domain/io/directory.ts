import { parse, sep } from "path";

class Directory {
  constructor(
    public readonly segments: string[],
    public readonly sep: string
  ) {}

  get directory() {
    return this.segments.join(this.sep);
  }

  get full() {
    return this.directory;
  }

  static with(
    base: Directory,
    { segments, sep }: Partial<Directory> = {}
  ): Directory {
    return new Directory(segments ?? base.segments, sep ?? base.sep);
  }

  static from(path: string) {
    const { dir } = parse(path);

    return new Directory(dir.split(sep), sep);
  }
}

export { Directory };
