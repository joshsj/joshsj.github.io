import { ILocator } from "@application/behaviours/types";
import { Page } from "@models";
import { File } from "@models/io";

class PageLocator implements ILocator<Page> {
  locate({ file }: Page): File {
    return file.with({
      segments: file.name !== "index" ? [file.name] : [],
      name: "index",
      extension: ".html",
    });
  }
}

export { PageLocator };
