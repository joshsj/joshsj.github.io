import { File } from ".";

interface IIO {
  write(file: File): Promise<void>;
  read(file: File): Promise<string>;
  walk(root: string): AsyncGenerator<string>;
}

export { IIO };
