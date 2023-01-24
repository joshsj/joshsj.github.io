import { GetContextHelpers } from "./types";
import { urlFor } from "./urlFor";
import { Transformers, transformers } from "@application/transformation";

const getContextHelpers =
  (transformers: Transformers)
    : GetContextHelpers => (data) => ({
    urlFor: urlFor(data, transformers),
  });

export { getContextHelpers };
