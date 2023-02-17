import { Builder } from "@application/behaviours/types";

const assetBuilder: Builder = async (something) => something.file.content;

export { assetBuilder };
