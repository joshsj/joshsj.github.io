import { FeatureName } from "@models";
import { File } from "@models/io";

interface IGetFeatureName {
  for(file: File): FeatureName | undefined;
}

export { IGetFeatureName };
