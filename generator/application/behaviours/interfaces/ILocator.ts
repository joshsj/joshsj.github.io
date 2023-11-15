import { Resource, ResourceFor } from "@models";
import { File } from "@models/io";

interface ILocator<T extends Resource = Resource> {
  readonly for: T["name"];

  locate(resource: T): File;
}
export { ILocator };
