import { EntityName } from "@models";

type Flag = "watch" | "debug" | "draft";

type Key = Extract<EntityName, "asset" | "page" | "post"> | "source" | "build" | "root";

type Config = { [K in `${Key}Dir`]: string } & { [K in Flag]: boolean };

export { Flag, Key, Config };
