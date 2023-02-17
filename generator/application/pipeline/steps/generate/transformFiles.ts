import { Builders, Locators } from "@application/behaviours/types";
import { TransformFilesStep } from "@application/pipeline/types/steps/generate";
import { Log } from "@application/services/types";
import { FeatureStore } from "@application/stores/types";
import { isFulfilled, isRejected } from "@application/utilities/native";
import { File } from "@models/io";

const transformFiles =
  (store: FeatureStore, locators: Locators, builders: Builders, log: Log): TransformFilesStep =>
  async () => {
    const results = await Promise.allSettled(
      store.map(async (f) => {
        const locator = locators[f.name];
        const builder = builders[f.name];

        if (!(locator && builder)) {
          return undefined;
        }

        return locator(f.file).with({ content: await builder(f) });
      })
    );

    const buildFiles = results
      .filter(isFulfilled)
      .map((r) => r.value)
      .filter((x): x is File => !!x);

    log(`Successfully transformed ${buildFiles.length}/${store.length} files`);

    log(
      "Failures",
      results.filter(isRejected).map((r) => r.reason)
    );

    return { buildFiles };
  };

export { transformFiles };
