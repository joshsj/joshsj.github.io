import { IIdentifier } from "@application/behaviours/types";
import { IGetFeatureName } from "@application/services/types";
import { Feature, FeatureName } from "@models";
import { File } from "@models/io";

class GetFeatureName implements IGetFeatureName {
  constructor(private readonly identifiers: IIdentifier<Feature>[]) {}

  for(file: File): FeatureName | undefined {
    return this.identifiers.find((i) => i.test(file))?.name;
  }
}

export { GetFeatureName };
