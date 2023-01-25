import { SomethingCategory } from "@domain";
import { File } from "@domain/io";
import { RenderContext } from "@application/steps/context";

type Transformer = {
  location: (file: File) => File;
  content: (context: RenderContext) => string;
};

type Transformers = { [K in SomethingCategory]: Transformer };

export { Transformer, Transformers };
