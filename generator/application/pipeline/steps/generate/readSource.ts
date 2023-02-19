import { ReadSourceStep } from "@application/pipeline/types/steps/generate";
import { Log } from "@application/services/types";
import { IO } from "@application/services/types/io";
import { fromGenerator, splitAllSettled } from "@application/utilities/native";
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

    const { fulfilled, rejected } = await splitAllSettled(sourcePaths.map(readFile));

    log(`Successfully read ${fulfilled.length}/${sourcePaths.length} source files`);
    log("Failures:", rejected);

    return { sourceFiles: fulfilled };
  };

export { readSource };
