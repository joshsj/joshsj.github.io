import { IO } from "@common/io";
import { Log } from "@common/logging";
import { Step } from "@common/pipeline";
import { FeatureStore } from "@common/stores";
import { Config } from "@entities/config";
import { file } from "@entities/io";
import { ExtractDataResult } from "./extractData";

const updateStore =
  (store: FeatureStore, io: IO, log: Log, config: Config): Step<ExtractDataResult, void> =>
  async ({ features }) => {
    for (const feature of features) {
      if (feature.name === "post" && feature.draft && !config.draft) {
        continue;
      }

      const index = store.findIndex((x) => x.file.full === feature.file.full);

      if (index > -1) {
        store[index] = feature;
      } else {
        store.push(feature);
      }
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
  };

export { updateStore };
