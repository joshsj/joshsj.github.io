import { IStep } from "./IStep";

export interface IPipelineBuilder<Initial, Current> {
  add<Next>(f: IStep<Current, Next>): IPipelineBuilder<Initial, Next>;
  build(): IStep<Initial, Current>;
}
