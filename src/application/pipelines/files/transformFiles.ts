import path from "path";
import { Config } from "@domain";
import { File } from "@domain/io";
import { isFulfilled } from "@domain/utils";
import { IStep } from "@lib/pipelineBuilder";
import { ILogger } from "@application/logging";
import { IFileTransformerFactory } from "@application/transformation";
import { ReadSourceResult } from "./readSource";

type TransformFilesResult = { buildFiles: File[] };

class TransformFilesStep
  implements IStep<TransformFilesResult, ReadSourceResult>
{
  constructor(
    private readonly fileTransformerFactory: IFileTransformerFactory,
    private readonly logger: ILogger,
    private readonly config: Config
  ) {}

  async execute({
    sourceFiles,
  }: ReadSourceResult): Promise<TransformFilesResult> {
    const results = await Promise.allSettled(
      sourceFiles.map((f) => this.transformFile(f))
    );

    const buildFiles = results
      .filter(
        (r): r is PromiseFulfilledResult<File> => isFulfilled(r) && !!r.value
      )
      .map((r) => r.value);

    return { buildFiles };
  }

  private async transformFile(file: File) {
    if (!file.contents) {
      return;
    }

    const sourcePath = `${path.join(this.config.sourceDir, file.full)}`;
    this.logger.log(`Processing ${sourcePath}`);

    const transformer = this.fileTransformerFactory.for(file);

    if (!transformer) {
      this.logger.log(`No processor found for ${sourcePath}`);
      return;
    }

    return await transformer.transform(file);
  }
}

export { TransformFilesResult, TransformFilesStep };
