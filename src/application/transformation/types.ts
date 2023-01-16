import { FileCategory } from "@domain";
import { File } from "@domain/io";

type FileTransformer = {
  transforms: FileCategory;
  transform(file: File): Promise<File>;
};

export { FileTransformer };
