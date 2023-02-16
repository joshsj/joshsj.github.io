import { makeNameFor } from "@common/identification";
import { pipeline } from "@common/pipeline";
import { makeGetRenderContext, makeRenderers } from "@common/rendering";
import { FeatureStore } from "@common/stores";
import { Config } from "@models/config";
import {
  extractData,
  identifyFiles,
  readSource,
  ReadSourceState,
  transformFiles,
  updateStore,
  writeBuild,
} from "@features/pipelines/generate";
import { io } from "@infrastructure/io";
import { consoleLogger } from "@infrastructure/logging";
import { makeEnvConfigProvider, makeArgvConfigProvider } from "@infrastructure/pipeline/config";
import { watch } from "chokidar";
import { benchmarkSteps } from "./entry/benchmark";
import { watchIndicator } from "./entry/watchIndicator";
import { makeDefaultExtractors, makeExtractors } from "@common/extraction/makeExtractors";
import { makeLocators } from "@common/locating/makeLocators";
import { makeAssetIdentifier } from "@features/asset";
import { makePageIdentifier } from "@features/page";
import { makePostIdentifier } from "@features/post";
import { makeCollectionIdentifier } from "@features/collection";
import { makeBuilders } from "@common/building";
import { makeApplyConfigurationProviders, makeSetDefaultConfig } from "@features/pipelines/config";
import { IO } from "@common/io";

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

  const log = config.debug ? consoleLogger("build") : () => {};
  const store: FeatureStore = [];

  const identifiers = [makeAssetIdentifier, makePageIdentifier, makePostIdentifier, makeCollectionIdentifier].map((i) =>
    i(config)
  );
  const nameFor = makeNameFor(identifiers);
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
    const onChange = (p: string) => generate({ sourcePaths: [p] });

    watch("**/*", { cwd: config.sourceDir, ignoreInitial: true }).on("add", onChange).on("change", onChange);
  }
};

main();
