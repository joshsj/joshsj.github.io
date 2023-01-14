import { ILogger } from "@application/logging";
import { DefaultConfigStep } from "@application/pipelines/config/defaultConfig";
import { LoadConfigStep } from "@application/pipelines/config/loadConfig";
import { ReadSourceStep, TransformFilesStep, WriteBuildStep } from "@application/pipelines/files";
import { CategoriseFilesStep } from "@application/pipelines/files/categoriseFiles";
import { AssetTransformer, PageTransformer } from "@application/transformation";
import { IIO } from "@domain/io";
import { IO } from "@infrastructure/io";
import { ConsoleLogger } from "@infrastructure/logging";
import { PipelineBuilder } from "@lib/pipelineBuilder";

const main = async () => {
  const io: IIO = new IO();
  const logger: ILogger = new ConsoleLogger();
  const transformers = [new AssetTransformer(), new PageTransformer()];

  const configPipeline = PipelineBuilder.create().add(new DefaultConfigStep()).add(new LoadConfigStep(logger)).build();

  const { config } = await configPipeline();

  const buildPipeline = PipelineBuilder.create()
    .add(new ReadSourceStep(io, config))
    .add(new CategoriseFilesStep(config))
    .add(new TransformFilesStep(transformers, logger, config))
    .add(new WriteBuildStep(io, config))
    .build();

  await buildPipeline();
};

main();
