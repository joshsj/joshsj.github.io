import { ReadSourceState } from "@models/steps";
import { IGeneratePipeline } from "@application/pipeline/types";
import { PipelineBuilder } from "../pipelineBuilder";
import {
  ReadSource,
  IdentifyFiles,
  ExtractData,
  UpdateStore,
  AddFileDependencies,
  TransformFiles,
  WriteBuild,
} from "@application/pipeline/steps/generate";
import { IGetEntityName, IO, Log } from "@application/services/types";
import { IEntityStore } from "@application/stores/types";
import { Config } from "@models";
import { IBuilderProvider, IExtractorProvider, ILocatorProvider } from "@application/behaviours/types";

class GeneratePipelineFactory {
  constructor(
    private readonly io: IO,
    private readonly log: Log,
    private readonly config: Config,
    private readonly entityStore: IEntityStore,
    private readonly getEntityName: IGetEntityName,
    private readonly builderProvider: IBuilderProvider,
    private readonly locatorProvider: ILocatorProvider,
    private readonly extractorProvider: IExtractorProvider
  ) {}

  get(): IGeneratePipeline {
    return new PipelineBuilder<ReadSourceState>()
      .add(new ReadSource(this.io, this.log, this.config))
      .add(new IdentifyFiles(this.getEntityName, this.log))
      .add(new ExtractData(this.extractorProvider, this.log))
      .add(new UpdateStore(this.entityStore, this.io, this.log, this.config))
      .add(new AddFileDependencies(this.entityStore, this.log))
      .add(new TransformFiles(this.locatorProvider, this.builderProvider, this.log))
      .add(new WriteBuild(this.io, this.log, this.config))
      .build();
  }
}

export { GeneratePipelineFactory };
