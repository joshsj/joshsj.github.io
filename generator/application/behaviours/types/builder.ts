import { Feature } from "@models";

interface IBuilder<T extends Feature> {
  build(feature: T): Promise<string>;
}

export { IBuilder };
