import { loadConfig } from "./configuration/load";
import { Config } from "./configuration/types";
import { File, IIO } from "./io";
import { IO } from "./io/io";
import { ConsoleLogger } from "./logging/consoleLogger";
import { ILogger } from "./logging/types";
import { ProcessorPipeline } from "./processing";
import { AssetProcessor, PageProcessor } from "./processing/processors";
import { IProcessor, IProcessorPipeline } from "./processing/types";
import { fromGenerator, walk } from "./utils";

const main = async () => {
  const config: Config = loadConfig();
  const logger: ILogger = new ConsoleLogger();
  const io: IIO = new IO(config);

  const processors: IProcessor[] = [
    new AssetProcessor(config),
    new PageProcessor(config),
  ];

  const pipeline: IProcessorPipeline = new ProcessorPipeline(
    processors,
    config,
    logger
  );

  const contentFiles = await fromGenerator(getFiles(io, config));

  const buildFiles = await pipeline.process(contentFiles);

  await writeFiles(buildFiles, io);
};

async function* getFiles(io: IIO, config: Config) {
  for await (const p of walk(config.sourceDir, { withFileTypes: true })) {
    const file = File.from(p);
    const contents = await io.read(file);
    yield File.with(file, { contents });
  }
}

async function writeFiles(files: File[], io: IIO) {
  return await Promise.allSettled(files.map((f) => io.write(f)));
}

main();
