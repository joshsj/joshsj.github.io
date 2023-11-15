import { Config } from "@core/models/config";
import { IIdentifier } from "@core/behaviours/interfaces";
import { Page } from "@core/models";
import { File } from "@core/models/io";

class PageIdentifier implements IIdentifier<Page> {
  readonly for = "page";

  constructor(private readonly config: Config) {}

  readonly name = "page";

  test({ dir, name }: File): boolean {
    return dir.root === this.config.pageDir && name.ext === ".pug";
  }
}

export { PageIdentifier };
