import { Config } from "@domain";
import { File, fileFrom, IO } from "@domain/io";
import { fromGenerator } from "@domain/utils";
import { Step } from "@lib/step";
import { LoadConfigResult } from "./loadConfig";

type ReadSourceResult = LoadConfigResult & { sourceFiles: File[] };

const makeReadSource =
  (io: IO): Step<LoadConfigResult, ReadSourceResult> =>
  (next) =>
  async ({ config }) => {
    const result = { config, sourceFiles: await fromGenerator(readFiles(io, config)) };

    await next?.(result);
    return result;
  };

async function* readFiles(io: IO, { sourceDir }: Config) {
  for await (const p of io.walk(sourceDir)) {
    const file = fileFrom(p);
    const contents = await io.read(file, sourceDir);

    yield file.with({ contents });
  }
}

export { ReadSourceResult, makeReadSource };
