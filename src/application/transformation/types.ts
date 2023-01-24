import { Context } from "@application/steps";
import { Config, SomethingCategory } from "@domain";
import { File } from "@domain/io";

type Transformer = (context: Context, config: Config) => Promise<File>;

type Transformers = { [K in SomethingCategory]: Transformer };

export { Transformer, Transformers };
