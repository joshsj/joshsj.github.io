import { File } from "@domain/io";

type FileTransformer = {
  transforms(file: File): boolean;
  transform(file: File): Promise<File>;
};

type FileTransformerFactory = {
  for(file: File): FileTransformer | undefined;
};

export { FileTransformer, FileTransformerFactory };
