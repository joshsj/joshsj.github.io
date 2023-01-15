import { Config } from "@domain";
import { File, IIO } from "@domain/io";
import { fromGenerator, walk } from "@domain/utils";
import { Step } from "@lib/link";
import { LoadConfigResult } from "./loadConfig";

type ReadSourceResult = LoadConfigResult & { sourceFiles: File[] };

const makeReadSource =
  (io: IIO): Step<LoadConfigResult, ReadSourceResult, void> =>
  (next) =>
  async ({ config }) => {
    const sourceFiles = await fromGenerator(readFiles(io, config));

    return await next({ config, sourceFiles });
  };

async function* readFiles(io: IIO, { sourceDir }: Config) {
  for await (const p of walk(sourceDir, { withFileTypes: true })) {
    const file = File.from(p);
    const contents = await io.read(file, sourceDir);

    yield File.with(file, { contents });
  }
}

export { ReadSourceResult, makeReadSource };
