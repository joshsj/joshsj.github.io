import { Directory, directory as _directory } from "./directory";
import _path from "path";

type File = Omit<Directory, "with"> &
  Readonly<{
    name: string;
    extension: string;
    content: string;
    base: string;
    with(patch?: Partial<File>): File;
  }>;

type Values = Pick<File, "segments" | "sep" | "name" | "extension" | "content">;

const file = (values: Values): File => {
  const { segments, sep } = values;
  const { directory, full } = _directory(values);

  const base = `${values.name}${values.extension}`;

  const f: File = {
    segments,
    sep,
    directory,
    base,
    name: values.name,
    extension: values.extension,
    content: values.content,
    full: [full, base].join(sep),
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

    Wrong: ".html" = {name: ".html", ext: ""}
    Right: ".html" = {name: "", ext: ".ext"}
  */
  if (!ext && name.startsWith(".")) {
    ext = name;
    name = "";
  }

  return file({
    segments: dir.split(_path.sep),
    sep: _path.sep,
    name,
    extension: ext,
    content: "",
  });
};

export { File, file, fileFrom };
