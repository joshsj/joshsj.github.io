import { File } from "../../domain";

type FileTransformer = {
  transforms(file: File): boolean;
  transform(file: File): Promise<File>;
};

type FileTransformerFactory = {
  for(file: File): FileTransformer | undefined;
};

export { FileTransformer, FileTransformerFactory };
