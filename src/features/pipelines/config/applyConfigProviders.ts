import { Step } from "@common/pipeline";
import { Config } from "@entities/config";
import { ConfigProvider } from "./provider";
import { SetDefaultConfigResult } from "./setDefaultConfig";

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
