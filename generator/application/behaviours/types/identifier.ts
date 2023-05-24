import { Entity } from "@models";
import { File } from "@models/io";

interface IIdentifier<T extends Entity> {
  readonly name: T["name"];
  test(file: File): boolean;
}

export { IIdentifier };
