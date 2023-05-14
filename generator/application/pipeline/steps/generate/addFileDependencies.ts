import { IFeatureStore } from "@application/stores/types";
import { ExtractDataResult } from "@models/steps/generate";
import { Log } from "@application/services/types";
import { IAddFileDependenciesStep } from "@application/pipeline/types";
import { Feature } from "@models";

class AddFileDependencies implements IAddFileDependenciesStep {
  constructor(private readonly store: IFeatureStore, private readonly log: Log) {}

  async execute({ features }: ExtractDataResult): Promise<ExtractDataResult> {
    const toBuild = new Set(features);
    const add = (...features: (Feature | undefined)[]) => features.forEach((f) => f && toBuild.add(f));
    let pagesAdded = false;

    for (const feature of features) {
      if (!pagesAdded && (feature.name === "post" || feature.name === "page")) {
        add(...this.store.allBy("page"));
        pagesAdded = true;
        this.log("Added pages as build dependencies");
      }

      if (feature.name === "collection") {
        add(this.store.allBy("page").find((x) => x.title === "Collections"));
        this.log(`Added collection page as build dependencies `);
      }
    }

    return { features: [...toBuild] };
  }
}

export { AddFileDependencies };
