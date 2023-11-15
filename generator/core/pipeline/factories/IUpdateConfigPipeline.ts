import { ApplyConfigurationProviders } from "@core/pipeline/steps/config";
import { IConfigPopulator } from "@core/services/interfaces";
import { Config } from "@core/models";
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
