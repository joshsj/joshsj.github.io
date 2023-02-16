import { Identifier } from "@application/types/behaviours";
import { FeatureName } from "@models";
import { FeatureNameFor } from "@application/types/services";

const makeFeatureNameFor =
  (identifiers: Identifier<FeatureName>[]): FeatureNameFor =>
    (file) =>
      identifiers.find((i) => i.test(file))?.name;

export { makeFeatureNameFor };
