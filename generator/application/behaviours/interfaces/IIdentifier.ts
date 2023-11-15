import { Resource } from "@models";
import { File } from "@models/io";

interface IIdentifier<T extends Resource = Resource> {
  readonly for: T["name"];

  test(file: File): boolean;
}

export { IIdentifier };
