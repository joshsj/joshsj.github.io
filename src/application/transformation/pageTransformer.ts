import { render } from "pug";
import { Transformer } from "./types";

const pageTransformer: Transformer = async ({ file }) =>
  file.with({
    // Place in root
    segments: [],
    // Render with pug
    contents: file.contents ? render(file.contents) : "",
    extension: ".html",
  });

export { pageTransformer };
