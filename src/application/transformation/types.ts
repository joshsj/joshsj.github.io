import { Something, SomethingCategory } from "@domain";
import { File } from "@domain/io";

type Locator = (file: File) => File;
type Builder = (something: Something) => Promise<string>;

type Locators = { [K in SomethingCategory]: Locator | undefined };

type Builders = { [K in SomethingCategory]: Builder | undefined };

export { Locator, Locators, Builder, Builders };
