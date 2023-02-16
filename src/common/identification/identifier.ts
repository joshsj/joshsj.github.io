import { FeatureName } from "@models";
import { File } from "@models/io";

type Identifier<T extends FeatureName> = {
  test: (file: File) => boolean;
  name: T;
};

export { Identifier };
