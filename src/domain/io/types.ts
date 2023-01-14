import { File } from ".";

interface IIO {
  write(file: File, root?: string): Promise<void>;
  read(file: File, root?: string): Promise<string>;
  walk(root: string): AsyncGenerator<string>;
}

export { IIO };
