import { FeatureName } from "@models";
import { Builder } from "@application/types/behaviours";

type Builders = { [K in FeatureName]: Builder | undefined };

export { Builders }