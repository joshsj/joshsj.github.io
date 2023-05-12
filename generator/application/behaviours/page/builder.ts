import { IBuilder } from "@application/behaviours/types";
import { IRenderer } from "@application/services/types";
import { Page } from "@models";

class PageBuilder implements IBuilder<Page> {
  constructor(private readonly pug: IRenderer<"pug">) {}

  async build(feature: Page): Promise<string> {
    return await this.pug.render(feature);
  }
}

export { PageBuilder };
