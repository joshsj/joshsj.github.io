import { IStep } from "@kernel/pipeline/interfaces";

class WatchIndicator implements IStep<void, void> {
  async execute() {
    console.log("Watching for changes");
  }
}

export { WatchIndicator };
