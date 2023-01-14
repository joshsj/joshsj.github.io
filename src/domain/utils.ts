import { readdir } from "fs/promises";
import path from "path";

type Options = Parameters<typeof readdir>[1];

async function* walk(root: string, options: Options) {
  yield* _walk(root, options);
}

async function* _walk(
  root: string,
  options: Options,
  walked = ""
): AsyncGenerator<string> {
  const entries = await readdir(root, options);

  for (const entry of entries) {
    const entryPath = path.join(walked, entry.name);

    if (entry.isDirectory()) {
      yield* _walk(path.join(root, entry.name), options, entryPath);
    } else {
      yield entryPath;
    }
  }
}

const fromGenerator = async <T>(generator: AsyncGenerator<T>) => {
  const values: T[] = [];

  for await (const value of generator) {
    values.push(value);
  }

  return values;
};

const isFulfilled = <T>(
  result: PromiseSettledResult<T>
): result is PromiseFulfilledResult<T> => result.status === "fulfilled";

const isRejected = <T>(
  result: PromiseSettledResult<T>
): result is PromiseRejectedResult => !isFulfilled(result);

export { walk, fromGenerator, isFulfilled, isRejected };
