import { Builders } from "@common/building";
import { Locators } from "@common/locating";
import { Log } from "@common/logging";
import { Step } from "@common/pipeline";
import { FeatureStore } from "@common/stores";
import { isFulfilled, isRejected } from "@common/utilities/native";
import { File } from "@entities/io";

type TransformFilesResult = { buildFiles: File[] };

const transformFiles =
  (store: FeatureStore, locators: Locators, builders: Builders, log: Log): Step<void, TransformFilesResult> =>
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

export { TransformFilesResult, transformFiles };
