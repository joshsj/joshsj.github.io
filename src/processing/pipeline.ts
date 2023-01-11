import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { IConfig } from "../configuration/types";
import { ILogger } from "../logging/types";
import { fromGenerator, walk } from "../utils";
import { Location } from "./location";
import { ILocation, IProcessor, IProcessorPipeline } from "./types";

class ProcessorPipeline implements IProcessorPipeline {
  constructor(
    private readonly processors: IProcessor[],
    private readonly config: IConfig,
    private readonly logger: ILogger
  ) {}

  async process(): Promise<void> {
    const paths = await this.getLocations();

    await Promise.allSettled(paths.map((p) => this.processFile(p)));
  }

  private async processFile(location: ILocation) {
    const sourcePath = path.join(
      this.config.sourceDir,
      location.directory,
      location.base
    );

    this.logger.log(`Processing ${sourcePath}`);

    const processor = this.processors.find((p) => p.processes(location));

    if (!processor) {
      this.logger.log("No processor found");
      return;
    }

    const source = await readFile(sourcePath, "utf-8");

    const content = await processor.process(location, source);

    if (!content.data) {
      return;
    }

    const destDir = path.join(this.config.buildDir, content.location.directory);
    const destPath = path.join(destDir, content.location.base);

    // Ensure destination folder exists
    await mkdir(destDir, { recursive: true });

    await writeFile(destPath, content.data);
  }

  private async getLocations(): Promise<ILocation[]> {
    const paths = await fromGenerator(
      walk(this.config.sourceDir, { withFileTypes: true })
    );

    return paths.map((p) => {
      const { dir, name, ext } = path.parse(p);

      return new Location(dir.split(path.sep), name, ext, path.sep);
    });
  }
}

export { ProcessorPipeline };
