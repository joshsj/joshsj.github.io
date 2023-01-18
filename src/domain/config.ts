import { File } from "./io";
import { SomethingCategory } from "./something";

type Map<T extends string> = { [K in T]: string };

type Env = Partial<Map<`${Uppercase<SomethingCategory | "source" | "build">}_DIR`>>;
type Config = Map<`${SomethingCategory | "source" | "build"}Dir`>;

export { Env, Config };
