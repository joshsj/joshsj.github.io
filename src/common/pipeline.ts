type Step<Current, Next> = (state: Current) => Promise<Next>;

type PipelineBuilder<Initial, Current> = {
  add: <Next>(f: Step<Current, Next>) => PipelineBuilder<Initial, Next>;

  build: () => Step<Initial, Current>;
};

type Pipeline = <Initial = void>() => PipelineBuilder<Initial, Initial>;

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

export { Step, PipelineBuilder, Pipeline, pipeline };
