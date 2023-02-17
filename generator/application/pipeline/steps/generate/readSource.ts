import { ReadSourceStep } from "@application/pipeline/types/steps/generate";
import { Log } from "@application/services/types";
import { IO } from "@application/services/types/io";
import { fromGenerator, isFulfilled, isRejected } from "@application/utilities/native";
import { Config } from "@models/config";
import { fileFrom } from "@models/io";

const readSource =
  (io: IO, log: Log, config: Config): ReadSourceStep =>
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

export { readSource };
