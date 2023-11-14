import { IBuilder } from "@application/behaviours/interfaces";
import { IRenderer } from "@application/services/interfaces";
import { PugRenderer } from "@application/services/renderer/PugRenderer";
import { Post } from "@models";

class PostBuilder implements IBuilder<"post"> {
  readonly for = "post";

  constructor(private readonly pug: PugRenderer) {}

  async build(resource: Post): Promise<string> {
    return await this.pug.render(resource);
  }
}

export { PostBuilder };
