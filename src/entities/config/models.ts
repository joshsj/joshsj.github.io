import { FeatureName } from "@entities";

type Flag = "watch" | "debug";

type Key = Extract<FeatureName, "asset" | "page" | "post"> | "source" | "build" | "root";

type Config = { [K in `${Key}Dir`]: string } & { [K in Flag]: boolean };

export { Key, Config };
