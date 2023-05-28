import { Encoding, File } from "@models/io";

type Options = {
  root?: string;
  encoding: Encoding;
};

interface IIO {
  read(file: File, root?: string): Promise<string>;
  write(file: File, root?: string): Promise<void>;
  walk(root: string): AsyncGenerator<string>;
  cwd(): string;
}

export { Options, IIO };
