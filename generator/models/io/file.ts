import binaryExtensions from "binaryextensions";
import path from "path";
import { Encoding } from "./encoding";
import { IDirectory, Directory } from "./directory";
import { Filename, IFilename } from "./filename";

interface IFile {
  readonly dir: IDirectory;
  readonly name: IFilename;
  readonly content: string;
  readonly encoding: Encoding;
}

class File implements IFile {
  dir: Directory;
  name: Filename;
  content: string;
  encoding: Encoding;

  private constructor({ dir: directory, name: filename, content, encoding }: IFile) {
    this.dir = Directory.from(directory);
    this.name = Filename.from(filename);
    this.content = content;
    this.encoding = encoding;
  }

  static from(file: IFile): File;
  static from(path: string): File;
  static from(obj: IFile | string): File {
    if (typeof obj === "object") {
      return new File(obj);
    }

    let { dir, name, ext } = path.parse(obj);

    /*
      Filenames that only have an extension are parsed differently
  
      Wrong: ".html" => {name: ".html", ext: ""}
      Right: ".html" => {name: "",      ext: ".html"}
    */
    if (!ext && name.startsWith(".")) {
      ext = name;
      name = "";
    }

    return new File({
      dir: Directory.from(dir),
      name: { base: name, ext },
      content: "",
      encoding: File.getEncoding(ext),
    });
  }

  with(patch: Partial<IFile>) {
    return new File({ ...this, ...patch });
  }

  get full() {
    return [this.dir.full, this.name.full].join(this.dir.sep);
  }

  static getEncoding(obj: Filename | string): Encoding {
    let ext = typeof obj === "string" ? obj : obj.ext ?? "";

    if (ext.startsWith(".")) {
      ext = ext.slice(1);
    }

    // Bold assumption
    return binaryExtensions.includes(ext) ? "binary" : "utf8";
  }
}

export { File, IFile };
