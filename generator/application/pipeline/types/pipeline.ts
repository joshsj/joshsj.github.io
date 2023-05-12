interface IStep<Current = void, Next = Current> {
  execute(state: Current): Promise<Next>;
}

interface IPipelineBuilder<Initial, Current> {
  add<Next>(f: IStep<Current, Next>): IPipelineBuilder<Initial, Next>;
  build(): IStep<Initial, Current>;
}

export { IStep, IPipelineBuilder };
