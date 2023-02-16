import { FeatureName } from "@models";
import { File } from "@models/io";
import { Identifier } from "./identifier";

type NameFor = (file: File) => FeatureName | undefined;

const makeNameFor =
  (identifiers: Identifier<FeatureName>[]): NameFor =>
  (file) =>
    identifiers.find((i) => i.test(file))?.name;

export { NameFor, makeNameFor };
