import { render } from "pug";
import { Transformer } from "./types";

const postTransformer: Transformer = async ({ file }) =>
  file.with({
    // Place in posts folder
    segments: ["posts", ...file.segments.slice(1)],
    // Render with pug
    contents: file.contents ? render(file.contents) : "",
    extension: ".html",
  });

export { postTransformer };
