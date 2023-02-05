import _path from "path";

type Directory = Readonly<{
  segments: string[];
  sep: string;
  directory: string;
  full: string;
  with(patch: Partial<Directory>): Directory;
}>;

type Values = Pick<Directory, "segments"> & Partial<Pick<Directory, "sep">>;

const directory = (values: Values): Directory => {
  const sep = values.sep ?? _path.sep;

  const d: Directory = {
    segments: values.segments,
    sep,
    directory: values.segments.join(sep),
    full: values.segments.join(sep),
    with(patch) {
      return directory({ ...d, ...patch });
    },
  };

  return d;
};

const directoryFrom = (path: string) => {
  const { dir } = _path.parse(path);

  return directory({ segments: dir.split(_path.sep), sep: _path.sep });
};

export { Directory, directory, directoryFrom };
