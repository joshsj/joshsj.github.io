import { FileCategory } from "@domain";
import { File } from "@domain/io";

type Transformer = (file: File) => Promise<File>;

type GetTransformer = (category: FileCategory) => Transformer;

export { Transformer, GetTransformer };
