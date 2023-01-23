import { Config, Something, SomethingCategory } from "@domain";
import { File } from "@domain/io";
import { Context } from "@application/steps";

type Transformer<T extends SomethingCategory> = (
  context: Context,
  config: Config
) => Promise<File>;

type GetTransformer = <T extends SomethingCategory>(category: T) => Transformer<T>;

export { Transformer, GetTransformer };
