import { Config } from "@models/config";

interface IConfigPopulator {
  populate(): Partial<Config>;
}

export { IConfigPopulator };
