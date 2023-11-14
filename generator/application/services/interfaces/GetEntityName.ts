import { EntityName } from "@models";
import { File } from "@models/io";

interface IGetEntityName {
  for(file: File): EntityName | undefined;
}

export { IGetEntityName };
