import { Logger } from "@application/logging";
import { Config } from "@domain";
import { File, fileFrom, IO } from "@domain/io";
import { fromGenerator, isFulfilled } from "@domain/utils";
import { Step } from "@lib/pipeline";

type ReadSourceState = { sourcePaths?: string[] };

type ReadSourceResult = { sourceFiles: File[] };

const readSource =
  (io: IO, log: Logger, config: Config): Step<ReadSourceState, ReadSourceResult> =>
  async ({ sourcePaths }) => {
    sourcePaths ??= await fromGenerator(io.walk(config.sourceDir));

    const results = await Promise.allSettled(sourcePaths.map((p) => readFile(p, io, log, config)));

    const sourceFiles = results.filter(isFulfilled).map((r) => r.value);

    log(`Successfully read ${sourceFiles.length}/${sourcePaths.length} source files`);

    return { sourceFiles };
  };

const readFile = async (path: string, io: IO, log: Logger, config: Config) => {
  const file = fileFrom(path);

  log(`Reading file ${file.full}`);

  const contents = await io.read(file, config.sourceDir);

  return file.with({ content: contents });
};

export { ReadSourceState, ReadSourceResult, readSource };
