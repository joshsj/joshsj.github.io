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

type SplitAllSettledData<T> = { fulfilled: T[]; rejected: PromiseRejectedResult["reason"][] };

const splitAllSettled = async <T>(promises: Promise<T>[]): Promise<SplitAllSettledData<T>> => {
  const results = await Promise.allSettled(promises);

  const data: SplitAllSettledData<T> = {
    fulfilled: [],
    rejected: [],
  };

  for (const result of results) {
    if (isFulfilled(result)) {
      data.fulfilled.push(result.value);
    } else {
      data.rejected.push(result.reason);
    }
  }

  return data;
};

export { fromGenerator, isFulfilled, isRejected, splitAllSettled, SplitAllSettledData };
