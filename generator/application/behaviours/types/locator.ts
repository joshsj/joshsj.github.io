import { Feature } from "@models";
import { File } from "@models/io";

interface ILocator<T extends Feature> {
  locate(feature: T): File;
}
export { ILocator };
