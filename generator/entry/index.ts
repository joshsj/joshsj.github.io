import "reflect-metadata";

import { registerApplication } from "@application/dependency";
import { UpdateConfigPipeline, GeneratePipeline } from "@application/pipeline/types";
import { registerInfrastructure } from "@infrastructure/dependency";
import { Config, D } from "@models";
import { container, DependencyContainer } from "tsyringe";
import { makeDefaultConfig } from "./defaultConfig";
import { IO } from "@application/services/types";
import { watch } from "chokidar";

const register = (c: DependencyContainer) => {
  registerApplication(c);
  registerInfrastructure(c);

  c.register<Config>(D.config, {
    useValue: makeDefaultConfig(c.resolve<IO>(D.io)),
  });
};

const main = async () => {
  register(container);

  const onChange = async (p?: string) => {
    const updateConfig = container.resolve<UpdateConfigPipeline>(D.configPipeline);
    await updateConfig();

    const generate = container.resolve<GeneratePipeline>(D.generatePipeline);
    await generate(p ? { sourcePaths: [p] } : {});
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
