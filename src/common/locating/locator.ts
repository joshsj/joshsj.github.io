import { FeatureName } from "@entities";
import { File } from "@entities/io";

type Locator = (file: File) => File;

type Locators = { [Name in FeatureName]: Locator | undefined };

export { Locator, Locators, };
