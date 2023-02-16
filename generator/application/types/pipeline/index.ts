type Step<Current, Next> = (state: Current) => Promise<Next>;

type PipelineBuilder<Initial, Current> = {
  add: <Next>(f: Step<Current, Next>) => PipelineBuilder<Initial, Next>;

  build: () => Step<Initial, Current>;
};

type Pipeline = <Initial = void>() => PipelineBuilder<Initial, Initial>;

export { Step, PipelineBuilder, Pipeline };
