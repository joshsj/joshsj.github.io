import { ConfigProvider, Log } from "@application/services/types";

const isSet = (arg: string) => process.argv.includes(`--${arg}`);

const makeArgvConfigProvider =
  (log: Log): ConfigProvider =>
  () => {
    log("Provided argv to config");

    return {
      watch: isSet("watch"),
      debug: isSet("debug"),
      draft: isSet("draft"),
    };
  };

export { makeArgvConfigProvider };
