// import { IStep } from "@application/pipeline/types";
// import { InitialState } from "@models/steps/generate";

// type BenchmarkContext = { start?: number; end?: number };

// const start =
//   (context: BenchmarkContext): IStep<InitialState, InitialState> =>
//   async (state) => {
//     context.start = performance.now();
//     context.end = undefined;

//     return state;
//   };

// const end = (context: BenchmarkContext): IStep<void, void> => {
//   const runs: number[] = [];

//   return async (state) => {
//     if (!context.start) {
//       return state;
//     }

//     context.end = performance.now();
//     const elapsed = context.end - context.start;
//     runs.push(elapsed);

//     console.log(`Build time: ${Math.round(elapsed)}ms`);
//     console.log(`Average build time: ${Math.round(runs.reduce((sum, n) => sum + n) / runs.length)}ms`);

//     return state;
//   };
// };

// const benchmarkSteps = () => {
//   const context: BenchmarkContext = {};

//   return {
//     benchmarkStart: start(context),
//     benchmarkEnd: end(context),
//   };
// };

// export { benchmarkSteps };
