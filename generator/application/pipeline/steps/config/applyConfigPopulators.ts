import { Config } from "@models/config";
import { ConfigPopulator } from "@application/services/types";
import { ApplyConfigProvidersStep } from "@application/pipeline/types/steps/config";

const makeApplyConfigurationProviders =
  (config: Config, providers: ConfigPopulator[]): ApplyConfigProvidersStep =>
  async () => {
    for (const patch of providers.map((p) => p(config))) {
      let key: keyof Config;

      for (key in patch) {
        const value = patch[key];

        if (value !== undefined) {
          (config as any)[key] = value;
        }
      }
    }
  };

export { makeApplyConfigurationProviders };
