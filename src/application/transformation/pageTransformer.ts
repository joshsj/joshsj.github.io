import { render } from "pug";
import { Config, File } from "../../domain";
import { FileTransformer } from "./types";

class PageTransformer implements FileTransformer {
  constructor(private readonly config: Config) {}

  transforms({ segments, extension }: File): boolean {
    return extension === ".pug" && segments.at(0) === this.config.pageDir;
  }

  async transform(file: File): Promise<File> {
    return File.with(file, {
      // Place in root
      segments: [],
      // Render with pug
      contents: file.contents ? render(file.contents) : "",
      extension: ".html",
    });
  }
}

export { PageTransformer };
