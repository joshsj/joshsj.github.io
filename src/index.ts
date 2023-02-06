import { makeNameFor } from "@common/identification";
import { pipeline } from "@common/pipeline";
import { makeGetRenderContext, makeRenderers } from "@common/rendering";
import { FeatureStore } from "@common/stores";
import { Config } from "@entities/config";
import {
  extractData,
  identifyFiles,
  readSource,
  ReadSourceState,
  transformFiles,
  updateStore,
  writeBuild,
} from "@features/pipelines/build";
import { setDefaultConfig } from "@features/pipelines/config";
import { io } from "@infrastructure/io";
import { consoleLogger } from "@infrastructure/logging";
import { loadArgv, loadEnv } from "@infrastructure/steps";
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

const buildGetConfig = () => {
  const log = consoleLogger("config");

  return pipeline().add(setDefaultConfig(log)).add(loadArgv).add(loadEnv(log)).build();
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
  const getConfig = buildGetConfig();
  const { config } = await getConfig();

  const build = buildGenerate(config);

  await build({ sourcePaths: [] });

  if (config.watch) {
    const onChange = (p: string) => build({ sourcePaths: [p] });

    watch("**/*", { cwd: config.sourceDir, ignoreInitial: true }).on("add", onChange).on("change", onChange);
  }
};

main();
