export interface IStep<Current = void, Next = Current> {
  execute(state: Current): Promise<Next>;
}
