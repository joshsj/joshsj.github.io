import { IBuilder } from "@application/behaviours/interfaces";
import { PugRenderer } from "@application/services/renderer/PugRenderer";
import { Page } from "@models";

class PageBuilder implements IBuilder<Page> {
  readonly for = "page";

  constructor(private readonly pug: PugRenderer) {}

  async build(resource: Page): Promise<string> {
    return await this.pug.render(resource);
  }
}

export { PageBuilder };
