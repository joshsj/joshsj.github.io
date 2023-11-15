import { Resource } from "@core/models";
import { Identified } from "@core/models/steps";

interface IExtractor<T extends Resource = Resource> {
  readonly for: T["name"];

  extract(file: Identified<T>): Promise<T>;
}

export { IExtractor };
