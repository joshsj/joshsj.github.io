import { EntityFor, EntityName } from "@models";
import { File } from "@models/io";

interface ILocator<T extends EntityName = EntityName> {
  readonly for: T;
  locate(entity: EntityFor<T>): File;
}
export { ILocator };
