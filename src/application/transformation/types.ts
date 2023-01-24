import { Context } from "@application/steps";
import { Config, SomethingCategory } from "@domain";
import { File } from "@domain/io";

// TODO separate?

type Transformer = {
  location: (file: File) => File;
  content: (context: Context) => Promise<string>;
};

type Transformers = { [K in SomethingCategory]: Transformer };

export { Transformer, Transformers };
