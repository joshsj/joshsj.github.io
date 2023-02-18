import { Extractors, Locators, Builders } from "@application/behaviours/types";
import { ConfigPopulator, FeatureNameFor, IO, Log } from "@application/services/types";
import { FeatureStore } from "@application/stores/types";
import { Config, D } from "@models";
import { DependencyContainer } from "tsyringe";
import { makeConfigPipeline, makeGeneratePipeline } from "./makePipelines";
import { GeneratePipeline, UpdateConfigPipeline } from "./types";

const registerPipelines = (c: DependencyContainer) => {
  c.register<UpdateConfigPipeline>(D.configPipeline, {
    useFactory: (c) => {
      const config = c.resolve<Config>(D.config);
      const configPopulators = c.resolveAll<ConfigPopulator>(D.configPopulator);

      return makeConfigPipeline(config, configPopulators);
    },
  });

  c.register<GeneratePipeline>(D.generatePipeline, {
    useFactory: (c) => {
      const io = c.resolve<IO>(D.io);
      const log = c.resolve<Log>(D.log);
      const config = c.resolve<Config>(D.config);
      const featureStore = c.resolve<FeatureStore>(D.featureStore);
      const extractors = c.resolve<Extractors>(D.extractors);
      const locators = c.resolve<Locators>(D.locators);
      const builders = c.resolve<Builders>(D.builders);
      const featureNameFor = c.resolve<FeatureNameFor>(D.featureNameFor);

      return makeGeneratePipeline(io, log, config, featureStore, extractors, locators, builders, featureNameFor);
    },
  });
};

export { registerPipelines };
