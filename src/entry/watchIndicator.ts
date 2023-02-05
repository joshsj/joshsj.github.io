import { Step } from "@common/pipeline";

const watchIndicator: Step<void, void> = async (state) => {
  console.log("Watching for changes");
  return state;
};

export { watchIndicator };
