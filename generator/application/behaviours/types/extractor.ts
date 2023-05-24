import { Entity } from "@models";
import { File } from "@models/io";

// TODO add entity name to generics
interface IExtractor<T extends Entity> {
  extract(file: File): Promise<T>;
}

export { IExtractor };
