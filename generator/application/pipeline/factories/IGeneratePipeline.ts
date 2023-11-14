import { IBuilder, IExtractor, ILocator } from "@application/behaviours/interfaces";
import {
  AddFileDependencies,
  ExtractData,
  IdentifyFiles,
  ReadSource,
  TransformFiles,
  UpdateStore,
  WriteBuild,
} from "@application/pipeline/steps/generate";
import { IGetResourceName, IIO, ILogger } from "@application/services/interfaces";
import { IResourceStore } from "@application/stores/interfaces";
import { Config } from "@models";
import { ReadSourceState } from "@models/steps";
import { IGeneratePipeline } from "../interfaces/IGeneratePipeline";
import { PipelineBuilder } from "@kernel/pipeline/PipelineBuilder";

class GeneratePipelineFactory {
  constructor(
    private readonly io: IIO,
    private readonly logger: ILogger,
    private readonly config: Config,
    private readonly resourceStore: IResourceStore,
    private readonly getResourceName: IGetResourceName,
    private readonly builders: IBuilder[],
    private readonly locators: ILocator[],
    private readonly extractors: IExtractor[]
  ) {}

  get(): IGeneratePipeline {
    return new PipelineBuilder<ReadSourceState>()
      .add(new ReadSource(this.io, this.logger, this.config))
      .add(new IdentifyFiles(this.getResourceName, this.logger))
      .add(new ExtractData(this.extractors, this.logger))
      .add(new UpdateStore(this.resourceStore, this.io, this.logger, this.config))
      .add(new AddFileDependencies(this.resourceStore, this.logger))
      .add(new TransformFiles(this.builders, this.locators, this.logger))
      .add(new WriteBuild(this.io, this.logger, this.config))
      .build();
  }
}

export { GeneratePipelineFactory };
