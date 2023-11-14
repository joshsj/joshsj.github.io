import { Resource, ResourceName } from "@models";
import { File } from "@models/io";

interface IIdentifier<T extends ResourceName = ResourceName> {
  readonly for: T;

  test(file: File): boolean;
}

export { IIdentifier };
