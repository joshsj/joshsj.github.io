import { IBuilder } from "@core/behaviours/interfaces";
import { IRenderer } from "@core/services/interfaces";
import { PugRenderer } from "@core/services/renderer/PugRenderer";
import { Post } from "@core/models";

class PostBuilder implements IBuilder<Post> {
  readonly for = "post";

  constructor(private readonly pug: PugRenderer) {}

  async build(resource: Post): Promise<string> {
    return await this.pug.render(resource);
  }
}

export { PostBuilder };
