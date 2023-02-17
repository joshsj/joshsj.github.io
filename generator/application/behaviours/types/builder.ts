import { Feature, FeatureName } from "@models";

type Builder = (something: Feature) => Promise<string>;

type Builders = { [K in FeatureName]: Builder | undefined };

export { Builder, Builders };
