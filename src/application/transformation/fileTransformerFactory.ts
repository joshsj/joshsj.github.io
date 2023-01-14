import { IFileTransformer, IFileTransformerFactory } from ".";
import { File } from "@domain/io";

class FileTransformerFactory implements IFileTransformerFactory {
  constructor(private readonly transformers: IFileTransformer[]) {}

  for(file: File): IFileTransformer | undefined {
    return this.transformers.find((t) => t.transforms(file));
  }
}

export { FileTransformerFactory };
