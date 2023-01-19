import { SomethingCategory } from "./something";

type Map<T extends string> = { [K in T]: string };

type Key = SomethingCategory | "source" | "build" | "root";

type Env = Partial<Map<`${Uppercase<Key>}_DIR`>>;
type Config = Map<`${Key}Dir`>;

export { Env, Config };
