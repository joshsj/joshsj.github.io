type Handler<State, Result> = keyof State extends never ? () => Promise<Result> : (state: State) => Promise<Result>;

type Step<State extends {}, Result extends {} | void = void> = (
  next?: Handler<Result, unknown>
) => Handler<State, Result>;

const terminate: Handler<any, void> = async () => {};

export { Handler, Step, terminate };
