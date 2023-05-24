import { IIdentifier } from "@application/behaviours/types";
import { Post } from "@models";
import { Config } from "@models/config";
import { File } from "@models/io";

class PostIdentifier implements IIdentifier<Post> {
  constructor(private readonly config: Config) {}

  readonly name = "post";

  test({ dir, name }: File): boolean {
    return dir.root === this.config.postDir && name.ext === ".pug";
  }
}

export { PostIdentifier };
