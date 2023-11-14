import { IIdentifier } from "@application/behaviours/interfaces";
import { IGetEntityName } from "@application/services/interfaces";
import { EntityName } from "@models";
import { File } from "@models/io";

class GetEntityName implements IGetEntityName {
  constructor(private readonly identifiers: IIdentifier[]) {}

  for(file: File): EntityName | undefined {
    return this.identifiers.find((i) => i.test(file))?.for;
  }
}

export { GetEntityName };
