import "reflect-metadata";

import { Config, D } from "@core/models";
import { container } from "tsyringe";
import { watch } from "chokidar";
import { CoreDependencies } from "@core/dependency";
import { InfrastructureDependencies } from "@infrastructure/dependency";
import { EntryDependencies } from "./dependency";
import { UpdateConfigPipelineFactory } from "@core/pipeline/factories/IUpdateConfigPipeline";
import { GeneratePipelineFactory } from "@core/pipeline/factories/IGeneratePipeline";

const main = async () => {
  CoreDependencies.create(container).registerBehaviours().registerPipelines().registerServices();
  InfrastructureDependencies.create(container).registerServices().registerStores();
  EntryDependencies.create(container).register();

  const onChange = async (p?: string) => {
    await container
      .resolve<GeneratePipelineFactory>(D.generatePipelineFactory)
      .get()
      .execute(p ? { sourcePaths: [p] } : {});
  };

  await container.resolve<UpdateConfigPipelineFactory>(D.updateConfigPipelineFactory).get().execute();

  // Initial build
  await onChange();

  // Set up watching
  const config = container.resolve<Config>(D.config);

  if (config.watch) {
    watch("**/*", { cwd: config.sourceDir, ignoreInitial: true }).on("add", onChange).on("change", onChange);
  }
};

main();
