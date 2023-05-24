import { Entity } from "@models";
import { File } from "@models/io";

interface ILocator<T extends Entity> {
  locate(entity: T): File;
}
export { ILocator };
