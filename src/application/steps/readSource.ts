import { Logger } from "@application/logging";
import { Config } from "@domain";
import { fileFrom, IO } from "@domain/io";
import { fromGenerator, isFulfilled, isRejected } from "@lib/utils";
import { Step } from "@lib/pipeline";
import { ReadSourceResult } from "./types";

const readSource =
  (io: IO, log: Logger, config: Config): Step<void, ReadSourceResult> =>
  async () => {
    const readFile = async (path: string) => {
      const file = fileFrom(path);

      log(`Reading file ${file.full}`);

      const contents = await io.read(file, config.sourceDir);

      return file.with({ content: contents });
    };

    const sourcePaths = await fromGenerator(io.walk(config.sourceDir));

    const results = await Promise.allSettled(sourcePaths.map(readFile));

    const sourceFiles = results.filter(isFulfilled).map((r) => r.value);

    log(`Successfully read ${sourceFiles.length}/${sourcePaths.length} source files`);

    log(
      "Failures:",
      results.filter(isRejected).map((r) => r.reason)
    );

    return { sourceFiles };
  };

export { readSource };
