import { SomethingCategory } from "./something";

type ConfigKey = SomethingCategory | "source" | "build" | "root";

type Config = { [K in `${ConfigKey}Dir`]: string };

export { ConfigKey, Config };
