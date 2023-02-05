import { Encoding, File } from ".";

type Options = {
  root?: string;
  encoding: Encoding;
};

type IO = {
  read(file: File, encoding: Encoding, root?: string): Promise<string>;
  write(file: File, root?: string): Promise<void>;
  walk(root: string): AsyncGenerator<string>;
};

export { IO, Options };
