import { Config } from "@models/config";

type ConfigProvider = (current: Config) => Partial<Config>;

export { ConfigProvider };
