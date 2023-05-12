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
import { IGetFeatureName, IO, Log } from "@application/services/types";
import { IFeatureStore } from "@application/stores/types";
import { Config } from "@models";
import { IBuilderProvider, IExtractorProvider, ILocatorProvider } from "@application/behaviours/types";

class GeneratePipelineFactory {
  constructor(
    private readonly io: IO,
    private readonly log: Log,
    private readonly config: Config,
    private readonly featureStore: IFeatureStore,
    private readonly getFeatureName: IGetFeatureName,
    private readonly builderProvider: IBuilderProvider,
    private readonly locatorProvider: ILocatorProvider,
    private readonly extractorProvider: IExtractorProvider
  ) {}

  get(): IGeneratePipeline {
    return new PipelineBuilder<ReadSourceState>()
      .add(new ReadSource(this.io, this.log, this.config))
      .add(new IdentifyFiles(this.getFeatureName, this.log))
      .add(new ExtractData(this.extractorProvider, this.log))
      .add(new UpdateStore(this.featureStore, this.io, this.log, this.config))
      .add(new AddFileDependencies(this.featureStore, this.log))
      .add(new TransformFiles(this.locatorProvider, this.builderProvider, this.log))
      .add(new WriteBuild(this.io, this.log, this.config))
      .build();
  }
}

export { GeneratePipelineFactory };
