import { File } from "@models/io";

type Extracted<T extends {}> = { content: string; data: T };

type Extractor<T extends {} = any> = (file: File) => Promise<Extracted<T>>;

export { Extracted, Extractor };
