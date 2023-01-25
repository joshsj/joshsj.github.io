import { Log } from "@application/logging";
import { Step } from "@lib/pipeline";
import { WriteBuildResult } from "@application/steps";

const watchIndicator: Step<WriteBuildResult, WriteBuildResult> =
  async (state) => {
    console.log("Watching for changes");
    return state;
  };

export { watchIndicator };
