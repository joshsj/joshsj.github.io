import { IBuilder } from "@application/behaviours/types";
import { IRenderer } from "@application/services/types";
import { Post } from "@models";

class PostBuilder implements IBuilder<Post> {
  constructor(private readonly pug: IRenderer<"pug">) {}

  async build(feature: Post): Promise<string> {
    return await this.pug.render(feature);
  }
}

export { PostBuilder };
