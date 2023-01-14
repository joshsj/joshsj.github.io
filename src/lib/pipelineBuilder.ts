type ToCurr<T extends IStep<any, any> | {}> = T extends IStep<infer Curr, any>
  ? Curr
  : T;

interface IStep<Next extends {}, Curr extends {} = {}> {
  execute(state: Curr): Promise<Next>;
}

class PipelineBuilder<State extends {}> {
  private constructor(
    private readonly steps: IStep<any, any>[],
    private state: State
  ) {}

  static create(): PipelineBuilder<{}>;
  static create<State extends {}>(initial?: State) {
    return new PipelineBuilder([], initial ?? {});
  }

  add<Next extends {}>(step: IStep<Next, State>): PipelineBuilder<Next> {
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

export { IStep, PipelineBuilder };
