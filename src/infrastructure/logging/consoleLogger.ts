import { Logger } from "@application/logging";

const makeConsoleLogger =
  (context?: string): Logger =>
  (data) => {
    if (context) {
      console.log(context);
    }

    for (const d of data) {
      console.log(d);
    }
  };

export { makeConsoleLogger };
