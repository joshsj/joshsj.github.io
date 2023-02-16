import _path from "path";
import { Directory, directory as _directory } from "./directory";
import { Encoding } from "./encoding";
import { getEncoding } from "./getEncoding";

type File = Omit<Directory, "with"> &
  Readonly<{
    name: string;
    extension: string;
    base: string;
    content: string;
    encoding: Encoding;
    with(patch?: Partial<File>): File;
  }>;

type Values = Pick<File, "segments" | "name" | "extension" | "content" | "encoding"> & Partial<Pick<File, "sep">>;

const file = (values: Values): File => {
  const { segments, encoding } = values;
  const { directory, full } = _directory(values);

  const base = `${values.name}${values.extension}`;
  const sep = values.sep ?? _path.sep;

  const f: File = {
    segments,
    sep,
    directory,
    base,
    name: values.name,
    extension: values.extension,
    content: values.content,
    full: [full, base].join(sep),
    encoding,
    with(patch) {
      return file({ ...f, ...(patch ?? {}) });
    },
  };

  return f;
};

const fileFrom = (path: string): File => {
  let { dir, name, ext } = _path.parse(path);

  /*
    Filenames that only have an extension are parsed differently

    Wrong: ".html" => {name: ".html", ext: ""}
    Right: ".html" => {name: "",      ext: ".ext"}
  */
  if (!ext && name.startsWith(".")) {
    ext = name;
    name = "";
  }

  return file({
    segments: dir.split(_path.sep),
    name,
    extension: ext,
    content: "",
    encoding: getEncoding(ext),
  });
};

export { File, file, fileFrom, Encoding };
