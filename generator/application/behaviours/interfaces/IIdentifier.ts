import { Entity, EntityName } from "@models";
import { File } from "@models/io";

interface IIdentifier<T extends EntityName = EntityName> {
  readonly for: T;

  test(file: File): boolean;
}

export { IIdentifier };
