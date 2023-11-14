import { ResourceFor, ResourceName } from "@models";

interface IBuilder<T extends ResourceName = ResourceName> {
  // readonly for: T;

  build(resource: ResourceFor<T>): Promise<string>;
}

export { IBuilder };
