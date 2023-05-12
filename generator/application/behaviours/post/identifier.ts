import { IIdentifier } from "@application/behaviours/types";
import { Post } from "@models";
import { Config } from "@models/config";
import { File } from "@models/io";

class PostIdentifier implements IIdentifier<Post> {
  constructor(private readonly config: Config) {}

  readonly name = "post";

  test({ segments, extension }: File): boolean {
    return segments.at(0) === this.config.postDir && extension === ".pug";
  }
}

export { PostIdentifier };
