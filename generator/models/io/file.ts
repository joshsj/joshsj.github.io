import binaryExtensions from "binaryextensions";
import _path from "path";
import { Encoding } from "./encoding";
import { IPath } from "./path";

interface IFile extends IPath {
  readonly name: string;
  readonly extension: string;
  readonly base: string;
  readonly directory: string;
  readonly full: string;
  readonly content: string;
  readonly encoding: Encoding;
}

type Patch = Pick<IFile, "segments" | "sep" | "name" | "extension" | "content" | "encoding">;

class File implements IFile {
  readonly name: string;
  readonly extension: string;
  readonly base: string;
  readonly directory: string;
  readonly full: string;
  readonly content: string;
  readonly encoding: Encoding;
  readonly segments: string[];
  readonly sep: string;

  private constructor(patch: Patch) {
    this.segments = patch.segments;
    this.sep = patch.sep;

    this.name = patch.name;
    this.extension = patch.extension;
    this.content = patch.content;
    this.encoding = patch.encoding;

    this.base = `${this.name}${this.extension}`;
    this.directory = this.segments.join(this.sep);
    this.full = [...this.segments, this.base].join(this.sep);
  }

  static from(patch: Patch): File;
  static from(path: string): File;
  static from(patchOrPath: Patch | string): File {
    if (typeof patchOrPath === "object") {
      return new File(patchOrPath);
    }

    let { dir, name, ext } = _path.parse(patchOrPath);

    /*
    Filenames that only have an extension are parsed differently

    Wrong: ".html" => {name: ".html", ext: ""}
    Right: ".html" => {name: "",      ext: ".html"}
  */
    if (!ext && name.startsWith(".")) {
      ext = name;
      name = "";
    }

    const sep = _path.sep;

    return new File({
      segments: dir.split(sep),
      sep,
      name,
      extension: ext,
      content: "",
      encoding: File.getEncoding(ext),
    });
  }

  with(patch: Partial<Patch>): File {
    return new File({ ...this, ...patch });
  }

  static getEncoding(fos: File | string): Encoding {
    let ext = typeof fos === "string" ? fos : fos.extension;

    if (ext.startsWith(".")) {
      ext = ext.slice(1);
    }

    // Bold assumption
    return binaryExtensions.includes(ext) ? "binary" : "utf8";
  }
}

export { File, IFile };
