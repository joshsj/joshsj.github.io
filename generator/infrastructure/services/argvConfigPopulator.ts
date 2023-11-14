import { IConfigPopulator } from "@application/services/interfaces";
import { Config } from "@models";

class ArgvConfigProvider implements IConfigPopulator {
  populate(): Partial<Config> {
    const isSet = (arg: string) => process.argv.includes(`--${arg}`);

    return {
      watch: isSet("watch"),
      draft: isSet("draft"),
    };
  }
}

export { ArgvConfigProvider };
