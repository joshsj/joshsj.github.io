import { IIdentifier } from "@application/behaviours/types";
import { IGetEntityName } from "@application/services/types";
import { EntityName } from "@models";
import { File } from "@models/io";

class GetEntityName implements IGetEntityName {
  constructor(private readonly identifiers: IIdentifier[]) {}

  for(file: File): EntityName | undefined {
    return this.identifiers.find((i) => i.test(file))?.for;
  }
}

export { GetEntityName };
