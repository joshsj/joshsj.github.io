import { Step } from "@application/pipeline/types";

const watchIndicator: Step<void, void> = async (state) => {
  console.log("Watching for changes");
  return state;
};

export { watchIndicator };
