import { FeatureName } from "@models";
import { File } from "@models/io";

type Locator = (file: File) => File;

type Locators = { [Name in FeatureName]: Locator | undefined };

export { Locator, Locators, };
