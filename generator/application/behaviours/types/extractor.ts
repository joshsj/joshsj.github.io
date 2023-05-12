import { Feature } from "@models";
import { File } from "@models/io";

// TODO add feature name to generics
interface IExtractor<T extends Feature> {
  extract(file: File): Promise<T>;
}

export { IExtractor };
