import { FeatureName } from "@models";
import { FeatureNameFor } from "@application/services/types";
import { Identifier } from "@application/behaviours/types";

const makeFeatureNameFor =
  (identifiers: Identifier<FeatureName>[]): FeatureNameFor =>
  (file) =>
    identifiers.find((i) => i.test(file))?.name;

export { makeFeatureNameFor };
