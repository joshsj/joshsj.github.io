import { Config } from "@models/config";
import { IIdentifier } from "@application/behaviours/types";
import { Page } from "@models";
import { File } from "@models/io";

class PageIdentifier implements IIdentifier<"page"> {
  readonly for = "page";

  constructor(private readonly config: Config) {}

  readonly name = "page";

  test({ dir, name }: File): boolean {
    return dir.root === this.config.pageDir && name.ext === ".pug";
  }
}

export { PageIdentifier };
