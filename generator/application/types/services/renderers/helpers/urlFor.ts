import { Feature, FeatureName } from "@models";

type UrlFor = ((name: FeatureName, filename: string) => string) & ((feature: Feature, filename?: undefined) => string);

export { UrlFor }