import path from "path";
import { Config } from "@domain";
import { File } from "@domain/io";
import { isFulfilled } from "@domain/utils";
import { IStep } from "@lib/pipelineBuilder";
import { ILogger } from "@application/logging";
import { IFileTransformer } from "@application/transformation";
import { CategorisedFile, CategoriseFilesResult } from "./categoriseFiles";

type TransformFilesResult = { buildFiles: File[] };

class TransformFilesStep implements IStep<TransformFilesResult, CategoriseFilesResult> {
  constructor(
    private readonly transformers: IFileTransformer[],
    private readonly logger: ILogger,
    private readonly config: Config
  ) {}

  async execute({ files }: CategoriseFilesResult): Promise<TransformFilesResult> {
    const results = await Promise.allSettled(files.map((f) => this.transformFile(f)));

    const buildFiles = results
      .filter((r): r is PromiseFulfilledResult<File> => isFulfilled(r) && !!r.value)
      .map((r) => r.value);

    return { buildFiles };
  }

  private async transformFile({ file, category }: CategorisedFile) {
    if (!file.contents) {
      return;
    }

    const sourcePath = `${path.join(this.config.sourceDir, file.full)}`;
    this.logger.log(`Processing ${sourcePath}`);

    const transformer = this.transformers.find((t) => t.transforms === category);

    if (!transformer) {
      throw new Error(`No processor found for ${sourcePath}`);
    }

    return await transformer.transform(file);
  }
}

export { TransformFilesResult, TransformFilesStep };
