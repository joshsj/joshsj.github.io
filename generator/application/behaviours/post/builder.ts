import { IBuilder } from "@application/behaviours/interfaces";
import { IRenderer } from "@application/services/interfaces";
import { Post } from "@models";

class PostBuilder implements IBuilder<"post"> {
  readonly for = "post";

  constructor(private readonly pug: IRenderer<"pug">) {}

  async build(entity: Post): Promise<string> {
    return await this.pug.render(entity);
  }
}

export { PostBuilder };
