import { ILocator } from "@core/behaviours/interfaces";
import { Page } from "@core/models";
import { File } from "@core/models/io";

class PageLocator implements ILocator<Page> {
  readonly for = "page";

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
