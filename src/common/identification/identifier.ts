import { FeatureName } from "@entities";
import { File } from "@entities/io";

type Identifier<T extends FeatureName> = {
  test: (file: File) => boolean;
  name: T;
};

export { Identifier };
