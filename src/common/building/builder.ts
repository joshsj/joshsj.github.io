import { Feature, FeatureName } from "@entities";

type Builder = (something: Feature) => Promise<string>;

type Builders = { [K in FeatureName]: Builder | undefined };

export { Builder, Builders };
