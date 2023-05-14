import { Config } from "@models/config";
import { IConfigPopulator } from "@application/services/types";
import { IStep } from "@application/pipeline/types";

class ApplyConfigurationProviders implements IStep {
  constructor(private readonly config: Config, private readonly providers: IConfigPopulator[]) {}

  async execute() {
    for (const patch of this.providers.map((p) => p.populate())) {
      let key: keyof Config;

      for (key in patch) {
        const value = patch[key];

        console.log({ key, value });

        if (value !== undefined) {
          (this.config as any)[key] = value;
        }
      }
    }
  }
}

export { ApplyConfigurationProviders };
