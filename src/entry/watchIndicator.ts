import { Step } from "@lib/pipeline";

const watchIndicator: Step<void, void> = async (state) => {
  console.log("Watching for changes");
  return state;
};

export { watchIndicator };
