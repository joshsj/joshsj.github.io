import { Resource, ResourceFor } from "@core/models";
import { File } from "@core/models/io";

interface ILocator<T extends Resource = Resource> {
  readonly for: T["name"];

  locate(resource: T): File;
}
export { ILocator };
