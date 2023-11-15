import { Config } from "@core/models/config";

interface IConfigPopulator {
  populate(): Partial<Config>;
}

export { IConfigPopulator };
