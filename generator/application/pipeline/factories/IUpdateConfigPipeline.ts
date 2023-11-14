import { ApplyConfigurationProviders } from "@application/pipeline/steps/config";
import { IConfigPopulator } from "@application/services/interfaces";
import { Config } from "@models";
import { IUpdateConfigPipeline } from "../interfaces/IUpdateConfigPipeline";
import { PipelineBuilder } from "../../../kernel/pipeline/PipelineBuilder";
import { NormaliseConfigPaths } from "../steps/config/NormaliseConfigPaths";

class UpdateConfigPipelineFactory {
  constructor(private readonly config: Config, private readonly providers: IConfigPopulator[]) {}

  get(): IUpdateConfigPipeline {
    return new PipelineBuilder()
      .add(new ApplyConfigurationProviders(this.config, this.providers))
      .add(new NormaliseConfigPaths(this.config))
      .build();
  }
}

export { UpdateConfigPipelineFactory };
