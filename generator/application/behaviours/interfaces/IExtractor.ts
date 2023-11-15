import { Resource } from "@models";
import { Identified } from "@models/steps";

interface IExtractor<T extends Resource = Resource> {
  readonly for: T["name"];

  extract(file: Identified<T>): Promise<T>;
}

export { IExtractor };
