import { Transformer } from "./types";
import { pug } from "@application/transformation/utils";

const postTransformer: Transformer<"post"> = async (something) =>
  something.file.with({
    // Place in posts folder
    segments: [ "posts", ...something.file.segments.slice(1) ],
    // Render with pug
    contents: pug(something),
    extension: ".html",
  });

export { postTransformer };
