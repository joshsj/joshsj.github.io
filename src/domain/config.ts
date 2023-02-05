import { SomethingCategory } from "./something";

type Flag = "watch" | "debug";

type ConfigKey = Exclude<SomethingCategory, "postAsset"> | "source" | "build" | "root";

type Config = { [K in `${ConfigKey}Dir`]: string } & { [K in Flag]: boolean };

export { ConfigKey, Config };
