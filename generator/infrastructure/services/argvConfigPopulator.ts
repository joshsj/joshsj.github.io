import { IConfigPopulator } from "@application/services/types";
import { Config } from "@models";

class ArgvConfigProvider implements IConfigPopulator {
  populate(): Partial<Config> {
    const isSet = (arg: string) => process.argv.includes(`--${arg}`);

    return {
      watch: isSet("watch"),
      debug: isSet("debug"),
      draft: isSet("draft"),
    };
  }
}

export { ArgvConfigProvider };
