import { Config, SomethingCategory } from "@domain";
import { File } from "@domain/io";

type GetCategory = (file: File, config: Config) => SomethingCategory | undefined;

type Categorisers = { [K in SomethingCategory]: (file: File, config: Config) => boolean };

export { GetCategory, Categorisers };
