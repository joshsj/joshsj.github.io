﻿import { Step } from "@application/pipeline/types";
import { InitialState } from "@application/pipeline/types/steps/generate";

type BenchmarkContext = { start?: number; end?: number };

const start =
  (context: BenchmarkContext): Step<InitialState, InitialState> =>
  async (state) => {
    context.start = performance.now();
    context.end = undefined;

    return state;
  };

const end = (context: BenchmarkContext): Step<void, void> => {
  const runs: number[] = [];

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
  };
};

const benchmarkSteps = () => {
  const context: BenchmarkContext = {};

  return {
    benchmarkStart: start(context),
    benchmarkEnd: end(context),
  };
};

export { benchmarkSteps };
