import "reflect-metadata";

import { Config, D } from "@models";
import { container } from "tsyringe";
import { watch } from "chokidar";
import { ApplicationDependencies } from "@application/dependency";
import { InfrastructureDependencies } from "@infrastructure/dependency";
import { EntryDependencies } from "./dependency";
import { UpdateConfigPipelineFactory } from "@application/pipeline/factories/updateConfigPipeline";
import { GeneratePipelineFactory } from "@application/pipeline/factories/generatePipeline";

const main = async () => {
  ApplicationDependencies.create(container).registerBehaviours().registerPipelines().registerServices();
  InfrastructureDependencies.create(container).registerServices().registerStores();
  EntryDependencies.create(container).register();

  const onChange = async (p?: string) => {
    await container.resolve<UpdateConfigPipelineFactory>(D.updateConfigPipelineFactory).get().execute();

    await container
      .resolve<GeneratePipelineFactory>(D.generatePipelineFactory)
      .get()
      .execute(p ? { sourcePaths: [p] } : {});
  };

  // Initial build
  await onChange();

  // Set up watching
  // TODO fix when adding config watching
  const config = container.resolve<Config>(D.config);

  if (config.watch) {
    watch("**/*", { cwd: config.sourceDir, ignoreInitial: true }).on("add", onChange).on("change", onChange);
  }
};

main();
