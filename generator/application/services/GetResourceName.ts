import { IIdentifier } from "@application/behaviours/interfaces";
import { IGetResourceName } from "@application/services/interfaces";
import { ResourceName } from "@models";
import { File } from "@models/io";

class GetResourceName implements IGetResourceName {
  constructor(private readonly identifiers: IIdentifier[]) {}

  for(file: File): ResourceName | undefined {
    return this.identifiers.find((i) => i.test(file))?.for;
  }
}

export { GetResourceName };
