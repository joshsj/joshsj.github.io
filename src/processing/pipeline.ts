import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { Config } from "../configuration/types";
import { ILogger } from "../logging/types";
import { File } from "../io";
import { IProcessor, IProcessorPipeline } from "./types";
import { isFulfilled } from "../utils";

class ProcessorPipeline implements IProcessorPipeline {
  constructor(
    private readonly processors: IProcessor[],
    private readonly config: Config,
    private readonly logger: ILogger
  ) {}

  async process(files: File[]): Promise<File[]> {
    const results = await Promise.allSettled(
      files.map((p) => this.processFile(p))
    );

    return results
      .filter(
        (r): r is PromiseFulfilledResult<File> =>
          isFulfilled(r) && r.value instanceof File
      )
      .map((r) => r.value);
  }

  private async processFile(contentFile: File): Promise<File | undefined> {
    if (!contentFile.contents) {
      return;
    }

    this.logger.log(
      `Processing ${path.join(this.config.sourceDir, contentFile.full)}`
    );

    const processor = this.processors.find((p) => p.processes(contentFile));

    if (!processor) {
      this.logger.log("No processor found");
      return;
    }

    return await processor.process(contentFile);
  }
}

export { ProcessorPipeline };
