import { GetContextHelpers } from "./types";
import { urlFor } from "./urlFor";

const getContextHelpers: GetContextHelpers = (data) => ({
  urlFor: urlFor(data),
});

export { getContextHelpers };
