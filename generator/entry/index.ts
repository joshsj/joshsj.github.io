import {
  makeBuilders,
  makeDefaultExtractors,
  makeExtractors,
  makeFeatureNameFor,
  makeGetRenderContext,
  makeLocators,
  makeRenderers
} from "@application/services";

import {
  extractData,
  identifyFiles,
  readSource,
  ReadSourceState,
  transformFiles,
  updateStore,
  writeBuild
} from "@application/features/pipelines/generate";

import { Config } from "@models";
import { watchIndicator } from "./watchIndicator";
import { makeApplyConfigurationProviders, makeSetDefaultConfig } from "@application/features/pipelines/config";
import { FeatureStore } from "@application/types/stores";
import { benchmarkSteps } from "./benchmark";
import { IO } from "@application/types/services";
import { consoleLogger, io, makeArgvConfigProvider, makeEnvConfigProvider } from "@infrastructure/services";
import { makeIdentifiers } from "@application/services/makeIdentifiers";
import { pipeline } from "@application/pipeline";
import { watch } from "chokidar";

const buildGetConfig = (io: IO) => {
  const log = consoleLogger("config");

  const setDefaultConfig = makeSetDefaultConfig(io, log);
  const applyConfigurationProviders = makeApplyConfigurationProviders([
    makeEnvConfigProvider(log),
    makeArgvConfigProvider(log),
  ]);

  return pipeline().add(setDefaultConfig).add(applyConfigurationProviders).build();
};

const buildGenerate = (config: Config) => {
  const { benchmarkStart, benchmarkEnd } = benchmarkSteps();

  const log = config.debug ? consoleLogger("build") : () => {
  };
  const store: FeatureStore = [];


  const identifiers = makeIdentifiers(config);
  const nameFor = makeFeatureNameFor(identifiers);
  const locators = makeLocators(config);
  const getRenderContext = makeGetRenderContext(store, locators);
  const renderers = makeRenderers(getRenderContext, config);
  const extractors = makeExtractors(makeDefaultExtractors(), renderers);
  const builders = makeBuilders(renderers);

  const buildPipeline = pipeline<ReadSourceState>()
    .add(benchmarkStart)
    .add(readSource(io, log, config))
    .add(identifyFiles(nameFor, log))
    .add(extractData(extractors, log))
    .add(updateStore(store, io, log, config))
    .add(transformFiles(store, locators, builders, log))
    .add(writeBuild(io, log, config))
    .add(benchmarkEnd);

  if (config.watch) {
    buildPipeline.add(watchIndicator);
  }

  return buildPipeline.build();
};

const main = async () => {
  const getConfig = buildGetConfig(io);
  const { config } = await getConfig();

  const generate = buildGenerate(config);

  await generate({ sourcePaths: [] });

  if (config.watch) {
    const onChange = (p: string) => generate({ sourcePaths: [ p ] });

    watch("**/*", { cwd: config.sourceDir, ignoreInitial: true }).on("add", onChange).on("change", onChange);
  }
};

main();
