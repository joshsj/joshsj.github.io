const toDependencies = <T extends string>(...names: T[]): Readonly<{ [K in T]: symbol }> =>
  Object.freeze(Object.assign({}, ...names.map((n) => ({ [n]: Symbol.for(n) }))));

// TODO move
// this layer probably shouldn't declare this
const Dependency = toDependencies(
  // config
  "config",
  "configPopulator",
  // stores
  "featureStore",
  // rendering
  "renderers",
  "renderHelpers",
  // behaviours
  "builders",
  "locators",
  "defaultExtractors",
  "extractors",
  "identifiers",
  // services
  "featureNameFor",
  "log",
  "io",
  // pipelines
  "configPipeline",
  "generatePipeline"
);

export { Dependency, Dependency as D };
