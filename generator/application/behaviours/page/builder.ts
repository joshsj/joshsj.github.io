import { IBuilder } from "@application/behaviours/interfaces";
import { IRenderer } from "@application/services/interfaces";
import { Page } from "@models";

class PageBuilder implements IBuilder<"page"> {
  readonly for = "page";

  constructor(private readonly pug: IRenderer<"pug">) {}

  async build(entity: Page): Promise<string> {
    return await this.pug.render(entity);
  }
}

export { PageBuilder };
