import { Builders, Locators } from "@application/behaviours/types";
import { TransformFilesStep } from "@application/pipeline/types/steps/generate";
import { Log } from "@application/services/types";
import { FeatureStore } from "@application/stores/types";
import { splitAllSettled } from "@application/utilities/native";
import { Feature } from "@models";
import { File, fileFrom } from "@models/io";

const permalinkLocator = (permalink: string) => fileFrom(permalink);

const transformFiles =
  (store: FeatureStore, locators: Locators, builders: Builders, log: Log): TransformFilesStep =>
  async () => {
    const transform = async (f: Feature) => {
      const locator = locators[f.name];
      const builder = builders[f.name];

      if (!(locator && builder)) {
        return undefined;
      }

      const located =
        "permalink" in f && typeof f.permalink === "string" ? permalinkLocator(f.permalink) : locator(f.file);

      return located.with({ content: await builder(f), encoding: f.file.encoding });
    };

    const { fulfilled, rejected } = await splitAllSettled(store.all().map(transform));
    const buildFiles = fulfilled.filter((x): x is File => !!x);

    log(`Successfully transformed ${buildFiles.length}/${store.count()} files`);
    log("Failures", rejected);

    return { buildFiles };
  };

export { transformFiles };
