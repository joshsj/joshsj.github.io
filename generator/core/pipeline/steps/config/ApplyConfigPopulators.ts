import { Config } from "@core/models/config";
import { IConfigPopulator } from "@core/services/interfaces";
import { IStep } from "@kernel/pipeline/interfaces";

class ApplyConfigurationProviders implements IStep {
  constructor(private readonly config: Config, private readonly providers: IConfigPopulator[]) {}

  async execute() {
    for (const patch of this.providers.map((p) => p.populate())) {
      let key: keyof Config;

      for (key in patch) {
        const value = patch[key];

        if (value !== undefined) {
          (this.config as any)[key] = value;
        }
      }
    }
  }
}

export { ApplyConfigurationProviders };
