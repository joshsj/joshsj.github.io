import { IBuilder, IExtractor, ILocator } from "@application/behaviours/types";
import {
  AddFileDependencies,
  ExtractData,
  IdentifyFiles,
  ReadSource,
  TransformFiles,
  UpdateStore,
  WriteBuild,
} from "@application/pipeline/steps/generate";
import { IGeneratePipeline } from "@application/pipeline/types";
import { IGetEntityName, IO, Log } from "@application/services/types";
import { IEntityStore } from "@application/stores/types";
import { Config } from "@models";
import { ReadSourceState } from "@models/steps";
import { PipelineBuilder } from "../pipelineBuilder";

class GeneratePipelineFactory {
  constructor(
    private readonly io: IO,
    private readonly log: Log,
    private readonly config: Config,
    private readonly entityStore: IEntityStore,
    private readonly getEntityName: IGetEntityName,
    private readonly builders: IBuilder[],
    private readonly locators: ILocator[],
    private readonly extractors: IExtractor[]
  ) {}

  get(): IGeneratePipeline {
    return new PipelineBuilder<ReadSourceState>()
      .add(new ReadSource(this.io, this.log, this.config))
      .add(new IdentifyFiles(this.getEntityName, this.log))
      .add(new ExtractData(this.extractors, this.log))
      .add(new UpdateStore(this.entityStore, this.io, this.log, this.config))
      .add(new AddFileDependencies(this.entityStore, this.log))
      .add(new TransformFiles(this.builders, this.locators, this.log))
      .add(new WriteBuild(this.io, this.log, this.config))
      .build();
  }
}

export { GeneratePipelineFactory };
