import { IBuilder } from "@application/behaviours/types";
import { IRenderer } from "@application/services/types";
import { Post } from "@models";

class PostBuilder implements IBuilder<"post"> {
  readonly for = "post";

  constructor(private readonly pug: IRenderer<"pug">) {}

  async build(entity: Post): Promise<string> {
    return await this.pug.render(entity);
  }
}

export { PostBuilder };
