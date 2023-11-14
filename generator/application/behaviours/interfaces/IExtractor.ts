import { ResourceFor, ResourceName } from "@models";
import { IdentifiedFor } from "@models/steps";

interface IExtractor<T extends ResourceName = ResourceName> {
  readonly for: T;

  extract(file: IdentifiedFor<T>): Promise<ResourceFor<T>>;
}

export { IExtractor };
