import { IIdentifier } from "@core/behaviours/interfaces";
import { Post } from "@core/models";
import { Config } from "@core/models/config";
import { File } from "@core/models/io";

class PostIdentifier implements IIdentifier<Post> {
  readonly for = "post";

  constructor(private readonly config: Config) {}

  readonly name = "post";

  test({ dir, name }: File): boolean {
    return dir.root === this.config.postDir && name.ext === ".pug";
  }
}

export { PostIdentifier };
