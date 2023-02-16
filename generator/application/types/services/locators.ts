import { FeatureName } from "@models";
import { Locator } from "@application/types/behaviours";

type Locators = { [Name in FeatureName]: Locator | undefined };

export {  Locators, };
