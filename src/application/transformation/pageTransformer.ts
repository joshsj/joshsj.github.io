import { render } from "pug";
import { Config, FileCategory } from "@domain";
import { File } from "@domain/io";
import { IFileTransformer } from "./types";

class PageTransformer implements IFileTransformer {
  transforms: FileCategory = "page";

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
