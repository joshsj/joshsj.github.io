import { ApplyConfigurationProviders } from "@application/pipeline/steps/config";
import { IUpdateConfigPipeline } from "@application/pipeline/types";
import { IConfigPopulator } from "@application/services/types";
import { Config } from "@models";
import { PipelineBuilder } from "../pipelineBuilder";

class UpdateConfigPipelineFactory {
  constructor(private readonly config: Config, private readonly providers: IConfigPopulator[]) {}

  get(): IUpdateConfigPipeline {
    return new PipelineBuilder().add(new ApplyConfigurationProviders(this.config, this.providers)).build();
  }
}

export { UpdateConfigPipelineFactory };
