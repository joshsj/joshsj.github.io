import { Feature } from "@models";
import { File } from "@models/io";

interface IIdentifier<T extends Feature> {
  readonly name: T["name"];
  test(file: File): boolean;
}

export { IIdentifier };
