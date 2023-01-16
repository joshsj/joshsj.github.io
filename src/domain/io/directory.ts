import _path from "path";

type Directory = Readonly<{
  segments: string[];
  sep: string;
  directory: string;
  full: string;
  with(patch: Partial<Directory>): Directory;
}>;

type Values = Pick<Directory, "segments" | "sep">;

const directory = ({ segments, sep }: Values): Directory => {
  const d: Directory = {
    segments,
    sep,
    directory: segments.join(sep),
    full: segments.join(sep),
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
