import { Identifiers } from "@application/behaviours/types";
import { FeatureNameFor } from "@application/services/types";

const makeFeatureNameFor =
  (identifiers: Identifiers): FeatureNameFor =>
  (file) =>
    identifiers.find((i) => i.test(file))?.name;

export { makeFeatureNameFor };
