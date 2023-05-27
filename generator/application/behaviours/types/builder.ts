import { EntityFor, EntityName } from "@models";

interface IBuilder<T extends EntityName = EntityName> {
  readonly for: T;

  build(entity: EntityFor<T>): Promise<string>;
}

export { IBuilder };
