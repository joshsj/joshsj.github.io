import { IIdentifier } from "@core/behaviours/interfaces";
import { IGetResourceName } from "@core/services/interfaces";
import { ResourceName } from "@core/models";
import { File } from "@core/models/io";

class GetResourceName implements IGetResourceName {
  constructor(private readonly identifiers: IIdentifier[]) {}

  for(file: File): ResourceName | undefined {
    return this.identifiers.find((i) => i.test(file))?.for;
  }
}

export { GetResourceName };
