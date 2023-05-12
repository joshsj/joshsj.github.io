import { IFeatureStore } from "@application/stores/types";
import { ExtractDataResult } from "@models/steps/generate";
import { Log } from "@application/services/types";
import { IAddFileDependenciesStep } from "@application/pipeline/types";

class AddFileDependencies implements IAddFileDependenciesStep {
  constructor(private readonly store: IFeatureStore, private readonly log: Log) {}

  async execute({ features }: ExtractDataResult): Promise<ExtractDataResult> {
    const toBuild = [...features];
    const featureNames = new Set(features.map((x) => x.name));

    // TODO collections (?)
    if (featureNames.has("post") || featureNames.has("page")) {
      toBuild.push(...this.store.allBy("page"));
      this.log("Added pages as build dependencies");
    }

    return { features: toBuild };
  }
}

export { AddFileDependencies };
