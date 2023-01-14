import { FileCategory } from "@domain";
import { File } from "@domain/io";

interface IFileTransformer {
  transforms: FileCategory;
  transform(file: File): Promise<File>;
}

export { IFileTransformer };
