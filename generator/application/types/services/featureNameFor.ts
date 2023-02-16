import { FeatureName } from "@models";
import { File } from "@models/io";

type FeatureNameFor = (file: File) => FeatureName | undefined;

export { FeatureNameFor };
