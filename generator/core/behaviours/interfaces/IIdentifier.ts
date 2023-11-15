import { Resource } from "@core/models";
import { File } from "@core/models/io";

interface IIdentifier<T extends Resource = Resource> {
  readonly for: T["name"];

  test(file: File): boolean;
}

export { IIdentifier };
