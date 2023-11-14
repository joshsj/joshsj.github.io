import { ResourceFor, ResourceName } from "@models";
import { File } from "@models/io";

interface ILocator<T extends ResourceName = ResourceName> {
  readonly for: T;
  locate(resource: ResourceFor<T>): File;
}
export { ILocator };
