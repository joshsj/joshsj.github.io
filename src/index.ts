import { loadConfig } from "./configuration/load";
import { IConfig } from "./configuration/types";
import { ConsoleLogger } from "./logging/consoleLogger";
import { ILogger } from "./logging/types";
import { ProcessorPipeline } from "./processing";
import { AssetProcessor, PageProcessor } from "./processing/processors";
import { IProcessor, IProcessorPipeline } from "./processing/types";

const main = async () => {
  const config: IConfig = loadConfig();
  const logger: ILogger = new ConsoleLogger();

  const processors: IProcessor[] = [
    new AssetProcessor(config),
    new PageProcessor(config),
  ];

  const pipeline: IProcessorPipeline = new ProcessorPipeline(
    processors,
    config,
    logger
  );

  await pipeline.process();
};

main();
