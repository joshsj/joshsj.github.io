import { ExtractDataResult } from "@models/steps/generate";
import { IIO, ILogger } from "@application/services/interfaces";
import { IEntityStore } from "@application/stores/interfaces";
import { Config } from "@models/config";
import { Directory, File } from "@models/io";
import { sep } from "path";
import { Filename } from "@models/io/filename";
import { IStep } from "@kernel/pipeline/interfaces";

class UpdateStore implements IStep<ExtractDataResult> {
  constructor(
    private readonly store: IEntityStore,
    private readonly io: IIO,
    private readonly logger: ILogger,
    private readonly config: Config
  ) {}

  async execute({ entitys }: ExtractDataResult): Promise<ExtractDataResult> {
    for (const entity of entitys) {
      if (entity.name === "post" && entity?.draft && !this.config.draft) {
        continue;
      }

      this.store.upsert(entity);
    }

    const file = File.from({
      // TODO consider not using path lib here
      dir: Directory.from({ segments: [], sep }),
      name: Filename.from({ base: "store", ext: ".json" }),
      content: JSON.stringify(this.store, undefined, 2),
      encoding: "utf8",
    });

    // Background
    this.io.write(file).then(() => this.logger.log(`Wrote site context to ${file.full}`));

    return { entitys };
  }
}

export { UpdateStore };
