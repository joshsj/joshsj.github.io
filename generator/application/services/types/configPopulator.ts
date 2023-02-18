import { Config } from "@models/config";

type ConfigPopulator = (current: Config) => Partial<Config>;

export { ConfigPopulator };
