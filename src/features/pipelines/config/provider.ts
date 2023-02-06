import { Config } from "@entities/config";

type ConfigProvider = (current: Config) => Partial<Config>;

export { ConfigProvider };
