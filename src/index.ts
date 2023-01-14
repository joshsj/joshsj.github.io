import { Logger } from "@application/logging";
import { DefaultConfigStep } from "@application/pipelines/config/defaultConfig";
import { LoadConfigStep } from "@application/pipelines/config/loadConfig";
import { ReadSourceStep } from "@application/pipelines/files/readSource";
import { TransformFilesStep } from "@application/pipelines/files/transformFiles";
import { WriteBuildStep } from "@application/pipelines/files/writeBuild";
import { AssetTransformer, PageTransformer } from "@application/transformation";
import { FileTransformerFactory } from "@application/transformation/fileTransformerFactory";
import { IO } from "@domain/io";
import { IOWithPath } from "@infrastructure/io/ioWithPath";
import { ConsoleLogger } from "@infrastructure/logging/consoleLogger";
import { PipelineBuilder } from "@lib/pipelineBuilder";

const main = async () => {
  const io: IO = new IOWithPath();
  const logger: Logger = new ConsoleLogger();

  const configPipeline = PipelineBuilder.create()
    .add(new DefaultConfigStep())
    .add(new LoadConfigStep(logger))
    .build();

  const { config } = await configPipeline();

  const fileTransformerFactory = new FileTransformerFactory([
    new AssetTransformer(config),
    new PageTransformer(config),
  ]);

  const buildPipeline = PipelineBuilder.create()
    .add(new ReadSourceStep(io, config))
    .add(new TransformFilesStep(fileTransformerFactory, logger, config))
    .add(new WriteBuildStep(io, config))
    .build();

  await buildPipeline();
};

main();
