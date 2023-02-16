import { Log } from "@application/types/services";

const consoleLogger = (context?: string): Log => {
  context = context ? ` [${context}] ` : " ";

  return (message: string, data?: unknown[]) => {
    if (data && !data.length) {
      return;
    }

    console.log(date() + context + message);

    for (const d of data ?? []) {
      console.log(d);
    }
  };
};

const date = () => {
  const now = new Date();

  // TODO might not perform so well
  return [
    now.getHours().toString().padStart(2, "0"),
    now.getMinutes().toString().padStart(2, "0"),
    now.getSeconds().toString().padStart(2, "0"),
    now.getMilliseconds().toString().padStart(3, "0"),
  ].join(":");
};

export { consoleLogger };
