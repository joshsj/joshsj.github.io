import { ResourceName } from "@core/models";

type Flag = "watch" | "draft";

type Key = Extract<ResourceName, "asset" | "page" | "post"> | "source" | "build" | "root";

type Config = { [K in `${Key}Dir`]: string } & { [K in Flag]: boolean };

export { Flag, Key, Config };
