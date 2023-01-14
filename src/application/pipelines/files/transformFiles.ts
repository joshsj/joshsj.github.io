import path from "path";
import { Config, File } from "../../../domain";
import { isFulfilled } from "../../../domain/utils";
import { Step } from "../../../lib";
import { Logger } from "../../logging";
import { FileTransformerFactory } from "../../transformation";
import { ReadSourceResult } from "./readSource";

type TransformFilesResult = { buildFiles: File[] };

class TransformFilesStep
  implements Step<TransformFilesResult, ReadSourceResult>
{
  constructor(
    private readonly fileTransformerFactory: FileTransformerFactory,
    private readonly logger: Logger,
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
