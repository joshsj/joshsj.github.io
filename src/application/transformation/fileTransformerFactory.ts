import {
  FileTransformer,
  FileTransformerFactory as _FileTransformerFactory,
} from ".";
import { File } from "../../domain";

class FileTransformerFactory implements _FileTransformerFactory {
  constructor(private readonly transformers: FileTransformer[]) {}

  for(file: File): FileTransformer | undefined {
    return this.transformers.find((t) => t.transforms(file));
  }
}

export { FileTransformerFactory };
