import { Transformer } from "./types";
import { pug } from "@application/transformation/utils";

const pageTransformer: Transformer<"page"> = async (something) =>
  something.file.with({
    // Place in root
    segments: [],
    contents: pug(something),
    extension: ".html",
  });

export { pageTransformer };
