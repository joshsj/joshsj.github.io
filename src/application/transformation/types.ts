import { Something, SomethingCategory } from "@domain";
import { File } from "@domain/io";

type Transformer<T extends SomethingCategory> = (something: Something & { category: T }) => Promise<File>;

type GetTransformer = <T extends SomethingCategory>(category: T) => Transformer<T>;

export { Transformer, GetTransformer };
