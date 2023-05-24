import path, { sep } from "path";

interface IDirectory {
  readonly segments: string[];
  readonly sep: string;
}

class Directory implements IDirectory {
  segments: string[];
  sep: string;

  private constructor({ segments, sep }: IDirectory) {
    this.segments = segments;
    this.sep = sep;
  }

  static from(patch: IDirectory): Directory;
  static from(path: string): Directory;
  static from(obj: IDirectory | string): Directory {
    return typeof obj === "string" ? new Directory({ segments: obj.split(sep), sep }) : new Directory(obj);
  }

  with(patch: Partial<IDirectory>) {
    return new Directory({ ...this, ...patch });
  }

  get full() {
    return this.segments.join(this.sep);
  }

  get root() {
    return this.segments[0];
  }
}

export { IDirectory, Directory };
