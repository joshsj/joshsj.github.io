import { ResourceName } from "@core/models";
import { File } from "@core/models/io";

interface IGetResourceName {
  for(file: File): ResourceName | undefined;
}

export { IGetResourceName };
