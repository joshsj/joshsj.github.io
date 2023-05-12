import { Config } from "@models/config";
import { IIdentifier } from "@application/behaviours/types";
import { Page } from "@models";
import { File } from "@models/io";

class PageIdentifier implements IIdentifier<Page> {
  constructor(private readonly config: Config) {}

  readonly name = "page";

  test({ segments, extension }: File): boolean {
    return segments.at(0) === this.config.pageDir && extension === ".pug";
  }
}

export { PageIdentifier };
