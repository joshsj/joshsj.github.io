import path from "path";

interface IPath {
  readonly segments: string[];
  readonly sep: string;
  readonly full: string;
}

type Patch = Omit<IPath, "full">;

class Path implements IPath {
  readonly segments: string[];
  readonly sep: string;
  readonly full: string;

  private constructor(patch: Patch) {
    this.segments = patch.segments;
    this.sep = patch.sep;
    this.full = this.segments.join(this.sep);
  }

  static from(patch: Patch): Path;
  static from(path: string): Path;
  static from(patchOrPath: Patch | string): Path {
    if (typeof patchOrPath === "object") {
      return new Path(patchOrPath);
    }

    const sep = path.sep;

    return new Path({ segments: path.parse(patchOrPath).dir.split(sep), sep });
  }

  with(patch: Partial<Patch>): Path {
    return new Path({ ...this, ...patch });
  }
}

export { IPath, Path };
