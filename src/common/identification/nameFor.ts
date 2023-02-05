import { FeatureName } from "@entities";
import { File } from "@entities/io";
import { Identifier } from "./identifier";

type NameFor = (file: File) => FeatureName | undefined;

const makeNameFor =
  (identifiers: Identifier<FeatureName>[]): NameFor =>
  (file) =>
    identifiers.find((i) => i.test(file))?.name;

export { NameFor, makeNameFor };
