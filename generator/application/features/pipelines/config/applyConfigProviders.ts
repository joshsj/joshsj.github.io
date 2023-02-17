import { Step } from "@application/pipeline/types";
import { Config } from "@models/config";
import { SetDefaultConfigResult } from "./setDefaultConfig";
import { ConfigProvider } from "@application/services/types";

type ApplyConfigProvidersResult = { config: Config };

const makeApplyConfigurationProviders =
  (providers: ConfigProvider[]): Step<SetDefaultConfigResult, ApplyConfigProvidersResult> =>
  async ({ config }) => {
    for (const patch of providers.map((p) => p(config))) {
      let key: keyof Config;

      for (key in patch) {
        const value = patch[key];

        if (value !== undefined) {
          (config as any)[key] = value;
        }
      }
    }

    return { config };
  };

export { makeApplyConfigurationProviders };
