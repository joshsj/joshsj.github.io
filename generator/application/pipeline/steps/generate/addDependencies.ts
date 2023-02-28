import { FeatureStore } from "@application/stores/types";
import { AddDependenciesStep } from "@application/pipeline/types/steps/generate";
import { Log } from "@application/services/types";

const addDependencies = (store: FeatureStore, log: Log): AddDependenciesStep => async ({ features }) => {
  const toBuild = [ ...features ]
  const featureNames = new Set(features.map(x => x.name));

  // TODO collections (?)
  if (featureNames.has("post") || featureNames.has("page")) {
    toBuild.push(...store.allBy("page"));
    log("Added pages as build dependencies");
  }

  return { features: toBuild }
}

export { addDependencies }