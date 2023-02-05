const fromGenerator = async <T>(generator: AsyncGenerator<T>) => {
  const values: T[] = [];

  for await (const value of generator) {
    values.push(value);
  }

  return values;
};

const isFulfilled = <T>(result: PromiseSettledResult<T>): result is PromiseFulfilledResult<T> =>
  result.status === "fulfilled";

const isRejected = <T>(result: PromiseSettledResult<T>): result is PromiseRejectedResult => !isFulfilled(result);

export { fromGenerator, isFulfilled, isRejected };
