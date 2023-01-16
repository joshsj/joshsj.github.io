import { render } from "pug";
import { File } from "@domain/io";
import { FileTransformer } from "./types";

const pageTransformer: FileTransformer = {
  transforms: "page",

  async transform(file: File): Promise<File> {
    return file.with({
      // Place in root
      segments: [],
      // Render with pug
      contents: file.contents ? render(file.contents) : "",
      extension: ".html",
    });
  },
};

export { pageTransformer };
