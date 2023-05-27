import { ILocator } from "@application/behaviours/types";
import { Post } from "@models";
import { File } from "@models/io";
import { Filename } from "@models/io/filename";

class PostLocator implements ILocator<"post"> {
  readonly for = "post";

  locate({ file }: Post): File {
    return file.with({
      dir: file.dir.with({ segments: ["blog", ...file.dir.segments.slice(1)] }),
      name: Filename.from({ base: "index", ext: ".html" }),
    });
  }
}

export { PostLocator };
