import { File } from "@models/io";

type Locator = (file: File) => File;

export { Locator };
