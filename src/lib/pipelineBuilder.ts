type ToCurr<T extends Step<any, any> | {}> = T extends Step<infer Curr, any>
  ? Curr
  : T;

type Step<Next extends {}, Curr extends {} = {}> = {
  execute(state: Curr): Promise<Next>;
};

class PipelineBuilder<State extends {}> {
  private constructor(
    private readonly steps: Step<any, any>[],
    private state: State
  ) {}

  static create(): PipelineBuilder<{}>;
  static create<State extends {}>(initial?: State) {
    return new PipelineBuilder([], initial ?? {});
  }

  add<Next extends {}>(step: Step<Next, State>): PipelineBuilder<Next> {
    this.steps.push(step);

    return this as any;
  }

  build(): () => Promise<State> {
    let { state, steps } = this;

    return async () => {
      for (const step of steps) {
        state = await step.execute(state);
      }

      return state;
    };
  }
}

export { Step, PipelineBuilder };
