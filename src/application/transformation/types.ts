import { Something, SomethingCategory } from "@domain";
import { File } from "@domain/io";

type Transformer = (something: Something) => Promise<File>;

type GetTransformer = (category: SomethingCategory) => Transformer;

export { Transformer, GetTransformer };
