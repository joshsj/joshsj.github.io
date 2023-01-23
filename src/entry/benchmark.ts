import { Step } from "@lib/pipeline";
import { Log } from "@application/logging";

type BenchmarkContext = { start?: number, end?: number }

const benchmarkStart = (context: BenchmarkContext): Step<void, void> => async () => {
  context.start = performance.now();
  context.end = undefined;
}

const benchmarkEnd = (context: BenchmarkContext, log: Log): Step<void, void> => async () => {
  if (!context.start) { return; }

  context.end = performance.now();

  const elapsed = context.end - context.start;

  log(`Build time: ${Math.round(elapsed)}ms`);
}

export { BenchmarkContext, benchmarkStart, benchmarkEnd }