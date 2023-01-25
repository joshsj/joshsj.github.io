import { GetRenderHelpers } from "./types";
import { urlFor } from "./urlFor";
import { Transformers } from "@application/transformation";

const getHelpers =
  (transformers: Transformers)
    : GetRenderHelpers => (context) => ({
    urlFor: urlFor(context, transformers),
  });

export { getHelpers };
