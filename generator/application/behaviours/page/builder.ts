import { IBuilder } from "@application/behaviours/interfaces";
import { IRenderer } from "@application/services/interfaces";
import { Page } from "@models";

class PageBuilder implements IBuilder<"page"> {
  readonly for = "page";

  constructor(private readonly pug: IRenderer<"pug">) {}

  async build(resource: Page): Promise<string> {
    return await this.pug.render(resource);
  }
}

export { PageBuilder };
