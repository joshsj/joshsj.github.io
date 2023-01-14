import { Logger } from "../../application/logging";

class ConsoleLogger implements Logger {
  constructor(public context?: string) {}

  log(...data: any[]): void {
    if (this.context) {
      console.log(this.context);
    }

    for (const d of data) {
      console.log(d);
    }
  }
}

export { ConsoleLogger };
