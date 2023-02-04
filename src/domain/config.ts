import { SomethingCategory } from "./something";

type ConfigKey = Exclude<SomethingCategory, "postAsset"> | "source" | "build" | "root";

type Config = { [K in `${ConfigKey}Dir`]: string };

export { ConfigKey, Config };
