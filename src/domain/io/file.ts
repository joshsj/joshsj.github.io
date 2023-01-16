import { Directory, directory as _directory } from "./directory";
import _path from "path";

type File = Omit<Directory, "with"> &
  Readonly<{
    name: string;
    extension: string;
    contents?: string;
    base: string;
    with(patch: Partial<File>): File;
  }>;

type Values = Pick<File, "segments" | "sep" | "name" | "extension" | "contents">;

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
    contents: values.contents,
    full: [full, base].join(sep),
    with(patch) {
      return file({ ...f, ...patch });
    },
  };

  return f;
};

const fileFrom = (path: string): File => {
  const { dir, name, ext } = _path.parse(path);

  return file({
    segments: dir.split(_path.sep),
    sep: _path.sep,
    name,
    extension: ext,
  });
};

export { File, file, fileFrom };
