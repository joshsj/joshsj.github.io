import { Resource } from "@core/models";

interface IBuilder<T extends Resource = Resource> {
  readonly for: T["name"];

  build(resource: T): Promise<string>;
}

export { IBuilder };
