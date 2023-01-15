type Handler<State, Result> = keyof State extends never ? () => Promise<Result> : (state: State) => Promise<Result>;

type Step<State, Result = void, Dest = Result> = Result extends Dest
  ? Handler<State, Dest>
  : (next: Handler<Result, Dest>) => Handler<State, Dest>;

export { Handler, Step };
