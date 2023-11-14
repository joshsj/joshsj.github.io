import { IIdentifier } from "@application/behaviours/interfaces";
import { Post } from "@models";
import { Config } from "@models/config";
import { File } from "@models/io";

class PostIdentifier implements IIdentifier<"post"> {
  readonly for = "post";

  constructor(private readonly config: Config) {}

  readonly name = "post";

  test({ dir, name }: File): boolean {
    return dir.root === this.config.postDir && name.ext === ".pug";
  }
}

export { PostIdentifier };
