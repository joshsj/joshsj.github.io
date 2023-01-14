type FileCategory = "asset" | "page";

type Map<T extends string> = { [K in T]: string };

type Key = FileCategory | "source" | "build";

type Env = Partial<Map<`${Uppercase<Key>}_DIR`>>;
type Config = Map<`${Key}Dir`>;

type Post = {
  title: string;
  created: Date;
  updated?: Date;
  tags: [];
};

type Context = { config: Config };

export { FileCategory, Env, Config };
