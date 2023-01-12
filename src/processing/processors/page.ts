import { IProcessor } from "../types";
import { Config } from "../../configuration/types";
import { render } from "pug";
import { File } from "../../io";

class PageProcessor implements IProcessor {
  constructor(private readonly config: Config) {}

  processes({ segments, extension }: File): boolean {
    return extension === ".pug" && segments.at(0) === this.config.pageDir;
  }

  async process(file: File): Promise<File> {
    return File.with(file, {
      // Place in root
      segments: [],
      // Render with pug
      contents: file.contents ? render(file.contents) : "",
      extension: ".html",
    });
  }
}

export { PageProcessor };
