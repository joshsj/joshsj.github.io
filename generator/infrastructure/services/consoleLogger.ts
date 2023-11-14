import { ILogger } from "@application/services/interfaces";

class ConsoleLogger implements ILogger {
  log(message: string, data?: unknown[]) {
    if (data && !data.length) {
      return;
    }

    console.log(ConsoleLogger.date + " " + message);

    for (const d of data ?? []) {
      console.log(d);
    }
  }

  private static get date() {
    const now = new Date();

    return [
      now.getHours().toString().padStart(2, "0"),
      now.getMinutes().toString().padStart(2, "0"),
      now.getSeconds().toString().padStart(2, "0"),
      now.getMilliseconds().toString().padStart(3, "0"),
    ].join(":");
  }
}

export { ConsoleLogger };
