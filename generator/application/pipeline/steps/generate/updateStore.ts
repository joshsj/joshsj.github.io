import { ExtractDataResult } from "@models/steps/generate";
import { IO, Log } from "@application/services/types";
import { IFeatureStore } from "@application/stores/types";
import { Config } from "@models/config";
import { IUpdateStoreStep } from "@application/pipeline/types";
import { File } from "@models/io";
import { sep } from "path";

class UpdateStore implements IUpdateStoreStep {
  constructor(
    private readonly store: IFeatureStore,
    private readonly io: IO,
    private readonly log: Log,
    private readonly config: Config
  ) {}

  async execute({ features }: ExtractDataResult): Promise<ExtractDataResult> {
    for (const feature of features) {
      if (feature.name === "post" && feature?.draft && !this.config.draft) {
        continue;
      }

      this.store.upsert(feature);
    }

    const file = File.from({
      name: "store",
      extension: ".json",
      segments: [],
      content: JSON.stringify(this.store, undefined, 2),
      encoding: "utf8",
      // TODO consider not using path lib here
      sep,
    });

    // Background
    this.io.write(file).then(() => this.log(`Wrote site context to ${file.base}`));

    return { features };
  }
}

export { UpdateStore };
