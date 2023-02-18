import { Extractors, Locators, Builders } from "@application/behaviours/types";
import { ConfigPopulator, FeatureNameFor, IO, Log } from "@application/services/types";
import { FeatureStore } from "@application/stores/types";
import { Config } from "@models";
import { pipeline } from "./pipeline";
import { makeApplyConfigurationProviders } from "./steps/config";
import { readSource, identifyFiles, extractData, updateStore, transformFiles, writeBuild } from "./steps/generate";
import { UpdateConfigPipeline, GeneratePipeline } from "./types";
import { InitialState } from "./types/steps/generate";

const makeConfigPipeline = (config: Config, configPopulators: ConfigPopulator[]): UpdateConfigPipeline =>
  pipeline().add(makeApplyConfigurationProviders(config, configPopulators)).build();

const makeGeneratePipeline = (
  io: IO,
  log: Log,
  config: Config,
  featureStore: FeatureStore,
  extractors: Extractors,
  locators: Locators,
  builders: Builders,
  featureNameFor: FeatureNameFor
): GeneratePipeline =>
  pipeline<InitialState>()
    .add(readSource(io, log, config))
    .add(identifyFiles(featureNameFor, log))
    .add(extractData(extractors, log))
    .add(updateStore(featureStore, io, log, config))
    .add(transformFiles(featureStore, locators, builders, log))
    .add(writeBuild(io, log, config))
    .build();

export { makeConfigPipeline, makeGeneratePipeline };
