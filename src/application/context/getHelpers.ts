import { GetRenderHelpers } from "./types";
import { urlFor } from "./urlFor";
import { Transformers } from "@application/transformation";
import { formatDate, formatDateTime, formatTime } from "@application/utilities";

const getHelpers =
  (transformers: Transformers): GetRenderHelpers =>
  (context) => ({
    urlFor: urlFor(context, transformers),
    formatDate,
    formatTime,
    formatDateTime,
  });

export { getHelpers };
