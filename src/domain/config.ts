import { SomethingCategory } from "./something";

type Flag = "watch" | "debug";

type ConfigKey = Extract<SomethingCategory, "asset" | "page" | "post"> | "source" | "build" | "root";

type Config = { [K in `${ConfigKey}Dir`]: string } & { [K in Flag]: boolean };

export { ConfigKey, Config };
