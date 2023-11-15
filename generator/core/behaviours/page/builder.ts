import { IBuilder } from "@core/behaviours/interfaces";
import { PugRenderer } from "@core/services/renderer/PugRenderer";
import { Page } from "@core/models";

class PageBuilder implements IBuilder<Page> {
  readonly for = "page";

  constructor(private readonly pug: PugRenderer) {}

  async build(resource: Page): Promise<string> {
    return await this.pug.render(resource);
  }
}

export { PageBuilder };
