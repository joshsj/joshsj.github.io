const toDependencies = <T extends string>(...names: T[]): Readonly<{ [K in T]: symbol }> =>
  Object.freeze(Object.assign({}, ...names.map((n) => ({ [n]: Symbol.for(n) }))));

const Dependency = toDependencies(
  // config
  "config",
  "configPopulator",
  // stores
  "entityStore",
  // identifiers
  "assetIdentifier",
  "collectionIdentifier",
  "pageIdentifier",
  "postIdentifier",
  // steps
  "identifier",
  "builder",
  "extractor",
  "locator",
  // renderer
  "pugRenderer",
  // services
  "getEntityName",
  "getUrl",
  "log",
  "io",
  // pipelines
  "updateConfigPipelineFactory",
  "generatePipelineFactory"
);

export { Dependency, Dependency as D };
