import { ILocator } from "@application/behaviours/interfaces";
import { Page } from "@models";
import { File } from "@models/io";

class PageLocator implements ILocator<"page"> {
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
