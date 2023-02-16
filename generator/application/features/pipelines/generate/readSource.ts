import { IO } from "@application/types/services/io";
import { Log } from "@application/types/services";
import { Step } from "@application/types/pipeline";
import { Config } from "@models/config";
import { Encoding, File, fileFrom } from "@models/io";
import binaryExtensions from "binaryextensions";
import { fromGenerator, isFulfilled, isRejected } from "@application/utilities/native";

type ReadSourceState = { sourcePaths?: string[] };
type ReadSourceResult = { sourceFiles: File[] };

const readSource =
  (io: IO, log: Log, config: Config): Step<ReadSourceState, ReadSourceResult> =>
  async ({ sourcePaths }) => {
    const readFile = async (path: string) => {
      const file = fileFrom(path);
      const content = await io.read(file, config.sourceDir);

      log(`Read file ${file.full} as ${file.encoding}`);

      return file.with({ content });
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

const getEncoding = (file: File): Encoding => {
  const ext = file.extension.slice(1);

  return binaryExtensions.includes(ext) ? "binary" : "utf8";
};

export { ReadSourceState, ReadSourceResult, readSource };
