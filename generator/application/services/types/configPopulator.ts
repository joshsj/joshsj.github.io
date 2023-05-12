import { Config } from "@models/config";

interface IConfigPopulator {
  populate(current: Config): Partial<Config>;
}

export { IConfigPopulator };
