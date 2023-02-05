import { Log } from "@application/logging";
import { Config } from "@domain";
import { Encoding, File, fileFrom, IO } from "@domain/io";
import { fromGenerator, isFulfilled, isRejected } from "@lib/utils";
import { Step } from "@lib/pipeline";
import { ReadSourceResult, ReadSourceState } from "@application/steps";
import binaryExtensions from "binaryextensions";

const getEncoding = (file: File): Encoding => {
  const ext = file.extension.slice(1);

  return binaryExtensions.includes(ext) ? "binary" : "utf8";
};

const readSource =
  (io: IO, log: Log, config: Config): Step<ReadSourceState, ReadSourceResult> =>
  async ({ sourcePaths }) => {
    const readFile = async (path: string) => {
      const file = fileFrom(path);
      const encoding = getEncoding(file);

      log(`Reading file ${file.full}`);

      const contents = await io.read(file, encoding, config.sourceDir);

      return file.with({ content: contents, encoding });
    };

    sourcePaths = sourcePaths && sourcePaths.length ? sourcePaths : await fromGenerator(io.walk(config.sourceDir));

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
