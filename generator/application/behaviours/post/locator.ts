import { ILocator } from "@application/behaviours/types";
import { Post } from "@models";
import { File } from "@models/io";

class PostLocator implements ILocator<Post> {
  locate({ file }: Post): File {
    return file.with({
      segments: ["blog", ...file.segments.slice(1)],
      name: "index",
      extension: ".html",
    });
  }
}

export { PostLocator };
