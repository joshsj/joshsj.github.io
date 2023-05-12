import { Feature, FeatureName } from "@models";

interface IGetUrl {
  for(name: FeatureName, filename: string): string;
  for(feature: Feature): string;
}

export { IGetUrl };
