const toDependencies = <T extends string>(...names: T[]): Readonly<{ [K in T]: symbol }> =>
  Object.freeze(Object.assign({}, ...names.map((n) => ({ [n]: Symbol.for(n) }))));

const Dependency = toDependencies(
  // config
  "config",
  "configPopulator",
  // stores
  "featureStore",
  // identifiers
  "assetIdentifier",
  "collectionIdentifier",
  "pageIdentifier",
  "postIdentifier",
  // extractors
  "collectionExtractor",
  "pageExtractor",
  "postExtractor",
  // locators
  "assetLocator",
  "pageLocator",
  "postLocator",
  // builders
  "assetBuilder",
  "postBuilder",
  "pageBuilder",
  "assetLocator",
  // providers
  "identifier",
  "locatorProvider",
  "extractorProvider",
  "builderProvider",
  // renderer
  "pugRenderer",
  // services
  "getFeatureName",
  "getUrl",
  "log",
  "io",
  // pipelines
  "updateConfigPipelineFactory",
  "generatePipelineFactory"
);

export { Dependency, Dependency as D };
