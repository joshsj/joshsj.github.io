import { loadConfig } from "./config";
import { ProcessorPipeline } from "./processing";
import { AssetProcessor, PageProcessor } from "./processing/processors";
import { IProcessor, IProcessorPipeline } from "./processing/types";

const main = async () => {
  const config = loadConfig();

  const processors: IProcessor[] = [
    new AssetProcessor(config),
    new PageProcessor(config),
  ];

  const pipeline: IProcessorPipeline = new ProcessorPipeline(
    processors,
    config
  );

  await pipeline.process();
};

main();
