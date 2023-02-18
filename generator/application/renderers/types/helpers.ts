import { Feature, FeatureName } from "@models";

type UrlFor = ((name: FeatureName, filename: string) => string) & ((feature: Feature) => string);

export { UrlFor };
