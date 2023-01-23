import { Log } from "@application/logging";
import { Step } from "@lib/pipeline";

const watchIndicator =
  (log: Log): Step<void, void> =>
  async () => {
    log("Watching for file changes...");
  };

export { watchIndicator };
