import { ILocator } from "@application/behaviours/types";
import { Page } from "@models";
import { File } from "@models/io";

class PageLocator implements ILocator<Page> {
  locate({ file }: Page): File {
    return file.with({
      dir: file.dir.with({ segments: file.name.base !== "index" ? [file.name.base] : [] }),
      name: {
        base: "index",
        ext: ".html",
      },
    });
  }
}

export { PageLocator };
