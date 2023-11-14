import { EntityFor, EntityName } from "@models";
import { IdentifiedFor } from "@models/steps";

interface IExtractor<T extends EntityName = EntityName> {
  readonly for: T;

  extract(file: IdentifiedFor<T>): Promise<EntityFor<T>>;
}

export { IExtractor };
