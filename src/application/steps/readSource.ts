import { Config } from "@domain";
import { File, fileFrom, IO } from "@domain/io";
import { fromGenerator } from "@domain/utils";
import { Step } from "@lib/step";
import { LoadConfigResult } from "./loadConfig";

type ReadSourceResult = LoadConfigResult & { sourceFiles: File[] };

const makeReadSource =
  (io: IO): Step<LoadConfigResult, ReadSourceResult, void> =>
  (next) =>
  async ({ config }) => {
    const sourceFiles = await fromGenerator(readFiles(io, config));

    return await next({ config, sourceFiles });
  };

async function* readFiles(io: IO, { sourceDir }: Config) {
  for await (const p of io.walk(sourceDir)) {
    const file = fileFrom(p);
    const contents = await io.read(file, sourceDir);

    yield file.with({ contents });
  }
}

export { ReadSourceResult, makeReadSource };
