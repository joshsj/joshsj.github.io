import { render } from "pug";
import { Transformer } from "./types";

const postTransformer: Transformer<"post"> = async ({ file, data }) =>
  file.with({
    // Place in posts folder
    segments: ["posts", ...file.segments.slice(1)],
    // Render with pug
    contents: file.contents ? render(file.contents, { filename: file.base, ...data }) : "",
    extension: ".html",
  });

export { postTransformer };
