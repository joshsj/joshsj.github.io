import { IPipelineBuilder, IStep } from "./types";

class PipelineBuilder<Initial = void> implements IPipelineBuilder<Initial, Initial> {
  private readonly steps: IStep<any, any>[];

  constructor() {
    this.steps = [];
  }

  add<Next>(f: IStep<Initial, Next>): IPipelineBuilder<Initial, Next> {
    this.steps.push(f);

    return this as any;
  }

  build(): IStep<Initial, Initial> {
    // Copy steps from state to prevent later changes
    const steps = [...this.steps];

    return {
      async execute(state) {
        for (const step of steps) {
          state = await step.execute(state);
        }

        return state;
      },
    };
  }
}

export { PipelineBuilder };
