import { FileCategory } from "@domain";
import { File } from "@domain/io";

type Transformer = (file: File) => Promise<File>;

type Transformers = {
  [K in FileCategory]: Transformer;
};

export { Transformer, Transformers };
