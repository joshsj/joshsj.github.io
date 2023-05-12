import { IConfigPopulator } from "@application/services/types";
import { Config } from "@models";

class ArgvConfigProvider implements IConfigPopulator {
  populate(current: Config): Partial<Config> {
    const isSet = (arg: string) => process.argv.includes(`--${arg}`);

    return {
      ...current,
      watch: isSet("watch"),
      debug: isSet("debug"),
      draft: isSet("draft"),
    };
  }
}

export { ArgvConfigProvider };
