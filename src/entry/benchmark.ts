import { Step } from "@lib/pipeline";
import { Log } from "@application/logging";
import { ReadSourceState } from "@application/steps";

type BenchmarkContext = { start?: number, end?: number }

const benchmarkStart = (context: BenchmarkContext): Step<ReadSourceState, ReadSourceState> => async (state) => {
  context.start = performance.now();
  context.end = undefined;

  return state;
}

const benchmarkEnd = (context: BenchmarkContext): Step<ReadSourceState, ReadSourceState> => {
  const runs : number[] = [];

  return async (state) => {
    if (!context.start) {
      return state;
    }

    context.end = performance.now();
    const elapsed = context.end - context.start;
    runs.push(elapsed);

    console.log(`Build time: ${Math.round(elapsed)}ms`);
    console.log(`Average build time: ${Math.round(runs.reduce((sum, n) => sum + n) / runs.length)}ms`);

    return state;
  }
}

export { BenchmarkContext, benchmarkStart, benchmarkEnd }