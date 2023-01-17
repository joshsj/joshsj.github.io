import { File } from "./io";

type FileCategory = "asset" | "page" | "post";

type Map<T extends string> = { [K in T]: string };

type Key = FileCategory | "source" | "build";

type Env = Partial<Map<`${Uppercase<Key>}_DIR`>>;
type Config = Map<`${Key}Dir`>;

type PostData = {
  title: string;
  created: Date;
  updated?: Date;
  tags?: [];
};

type Post = PostData & { file: File };

export { FileCategory, Env, Config, PostData, Post };
