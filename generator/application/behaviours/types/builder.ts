import { Entity } from "@models";

interface IBuilder<T extends Entity> {
  build(entity: T): Promise<string>;
}

export { IBuilder };
