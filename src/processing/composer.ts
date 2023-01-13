interface IStep<Next extends {}, Curr extends {} = {}> {
  execute(state: Curr): Promise<Next>;
}

interface IStepComposer<State extends {}> {
  add<Next extends {}>(step: IStep<Next, State>): IStepComposer<State & Next>;
  build(): () => Promise<State>;
}

class StepComposer<State extends {}> implements IStepComposer<State> {
  private constructor(
    private readonly steps: IStep<any, any>[],
    private state: any
  ) {}

  static create<State extends {} = {}>(inital: State) {
    return new StepComposer([], inital);
  }

  add<Next extends {}>(step: IStep<Next, State>): StepComposer<State & Next> {
    this.steps.push(step);

    return this as any;
  }

  build(): () => Promise<State> {
    const { state, steps } = this;

    return async () => {
      for (const step of steps) {
        Object.assign(state, await step.execute(state as any));

        return state as any;
      }
    };
  }
}

export { IStep, IStepComposer, StepComposer };
