import { Pipeline, PipelineBuilder, Step } from "./types";

const pipeline: Pipeline = <State>() => {
  const steps: Step<any, any>[] = [];

  const builder: PipelineBuilder<State, State> = {
    add: (f) => {
      steps.push(f);

      return builder as any;
    },

    build: () => {
      // Store steps in builder to prevent later changes
      const _steps = [...steps];

      return async (state) => {
        for (const step of _steps) {
          state = await step(state);
        }

        return state;
      };
    },
  };

  return builder;
};

export { pipeline };
