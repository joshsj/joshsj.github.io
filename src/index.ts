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
import { StepComposer } from "@lib/stepComposer";

const main = async () => {
  const io: IO = new IOWithPath();
  const logger: Logger = new ConsoleLogger();

  const { config } = await StepComposer.create()
    .add(new DefaultConfigStep())
    .add(new LoadConfigStep(logger))
    .build()();

  const fileTransformerFactory = new FileTransformerFactory([
    new AssetTransformer(config),
    new PageTransformer(config),
  ]);

  await StepComposer.create()
    .add(new ReadSourceStep(io, config))
    .add(new TransformFilesStep(fileTransformerFactory, logger, config))
    .add(new WriteBuildStep(io, config))
    .build()();
};

main();
