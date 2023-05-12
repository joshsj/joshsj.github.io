import { IStep } from "@application/pipeline/types";

class WatchIndicator implements IStep<void, void> {
  async execute() {
    console.log("Watching for changes");
  }
}

export { WatchIndicator };
