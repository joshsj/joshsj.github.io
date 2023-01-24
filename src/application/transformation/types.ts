import { Context } from "@application/context";
import { SomethingCategory } from "@domain";
import { File } from "@domain/io";

type Transformer = {
  location: (file: File) => File;
  content: (context: Context) => string;
};

type Transformers = { [K in SomethingCategory]: Transformer };

export { Transformer, Transformers };
