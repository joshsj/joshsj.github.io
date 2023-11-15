import { ExtractDataResult } from "@core/models/steps/generate";
import { IIO, ILogger } from "@core/services/interfaces";
import { IResourceStore } from "@core/stores/interfaces";
import { Config } from "@core/models/config";
import { Directory, File } from "@core/models/io";
import { sep } from "path";
import { Filename } from "@core/models/io/filename";
import { IStep } from "@kernel/pipeline/interfaces";

class UpdateStore implements IStep<ExtractDataResult> {
  constructor(
    private readonly store: IResourceStore,
    private readonly io: IIO,
    private readonly logger: ILogger,
    private readonly config: Config
  ) {}

  async execute({ resources }: ExtractDataResult): Promise<ExtractDataResult> {
    for (const resource of resources) {
      if (resource.name === "post" && resource?.draft && !this.config.draft) {
        continue;
      }

      this.store.upsert(resource);
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

    return { resources };
  }
}

export { UpdateStore };
