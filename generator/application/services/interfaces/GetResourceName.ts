import { ResourceName } from "@models";
import { File } from "@models/io";

interface IGetResourceName {
  for(file: File): ResourceName | undefined;
}

export { IGetResourceName };
