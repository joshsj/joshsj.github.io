import { File } from "@domain/io";

interface IFileTransformer {
  transforms(file: File): boolean;
  transform(file: File): Promise<File>;
}

interface IFileTransformerFactory {
  for(file: File): IFileTransformer | undefined;
}

export { IFileTransformer, IFileTransformerFactory };
