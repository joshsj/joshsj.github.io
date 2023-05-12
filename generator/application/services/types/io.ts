import { Encoding, File } from "@models/io";

type Options = {
  root?: string;
  encoding: Encoding;
};

// TODO change to interface
type IO = {
  read(file: File, root?: string): Promise<string>;
  write(file: File, root?: string): Promise<void>;
  walk(root: string): AsyncGenerator<string>;
  cwd(): string;
};

export { Options, IO };
