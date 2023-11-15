import { ILocator } from "@core/behaviours/interfaces";
import { Post } from "@core/models";
import { File } from "@core/models/io";
import { Filename } from "@core/models/io/filename";

class PostLocator implements ILocator<Post> {
  readonly for = "post";

  locate({ file }: Post): File {
    return file.with({
      dir: file.dir.with({ segments: ["blog", ...file.dir.segments.slice(1)] }),
      name: Filename.from({ base: "index", ext: ".html" }),
    });
  }
}

export { PostLocator };
