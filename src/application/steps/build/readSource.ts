import { Config } from "@domain";
import { File, fileFrom, IO } from "@domain/io";
import { fromGenerator } from "@domain/utils";
import { Step } from "@lib/pipeline";

type ReadSourceState = { sourcePaths?: string[] }
type ReadSourceResult = { sourceFiles: File[] };

const makeReadSource =
  (io: IO, config: Config): Step<ReadSourceState, ReadSourceResult> =>
    async ({ sourcePaths }) => ({
      sourceFiles: await fromGenerator(readFiles(io, config, sourcePaths))
    });

async function* readFiles(io: IO, config: Config, sourcePaths?: string[]) {
  for await (const p of sourcePaths ?? io.walk(config.sourceDir)) {
    const file = fileFrom(p);
    const contents = await io.read(file, config.sourceDir);

    yield file.with({ contents });
  }
}

export { ReadSourceState, ReadSourceResult, makeReadSource };
