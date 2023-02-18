import { ConfigPopulator, Log } from "@application/services/types";

const isSet = (arg: string) => process.argv.includes(`--${arg}`);

const makeArgvConfigProvider = (): ConfigPopulator => () => {
  return {
    watch: isSet("watch"),
    debug: isSet("debug"),
    draft: isSet("draft"),
  };
};

export { makeArgvConfigProvider };
