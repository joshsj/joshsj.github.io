import { UpdateStoreStep } from "@application/pipeline/types/steps/generate";
import { IO, Log } from "@application/services/types";
import { FeatureStore } from "@application/stores/types";
import { Config } from "@models/config";
import { file } from "@models/io";

const updateStore =
  (store: FeatureStore, io: IO, log: Log, config: Config): UpdateStoreStep =>
  async ({ features }) => {
    for (const feature of features) {
      if (feature.name === "post" && feature.draft && !config.draft) {
        continue;
      }

      store.upsert(feature);
    }

    const f = file({
      name: "store",
      extension: ".json",
      segments: [],
      content: JSON.stringify(store, undefined, 2),
      encoding: "utf8",
    });

    // Background
    io.write(f).then(() => log(`Wrote site context to ${f.base}`));

    return { features }
  };

export { updateStore };
